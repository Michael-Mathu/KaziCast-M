import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: "TALENT" | "DIRECTOR";
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: "TALENT" | "DIRECTOR";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "TALENT" | "DIRECTOR";
  }
}
