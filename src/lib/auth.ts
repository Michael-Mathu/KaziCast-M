import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// In-memory rate limiter for login attempts
const loginRateLimit = new Map<string, { count: number; startTime: number }>();
const LOGIN_WINDOW_MS = 60 * 1000; // 1 minute
const LOGIN_MAX_ATTEMPTS = 5; // 5 attempts per minute

function checkLoginRateLimit(email: string): boolean {
  const now = Date.now();
  const key = `login:${email}`;
  const entry = loginRateLimit.get(key);

  if (!entry || now - entry.startTime >= LOGIN_WINDOW_MS) {
    loginRateLimit.set(key, { count: 1, startTime: now });
    return true;
  }

  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    return false;
  }

  entry.count++;
  return true;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Apply rate limiting
        if (!checkLoginRateLimit(credentials.email)) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role as "TALENT" | "DIRECTOR" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};