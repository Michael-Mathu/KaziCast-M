import { withAuth } from "next-auth/middleware";

// ponytail: optimistic auth check — dashboard routes redirect to /login if no session
// real auth checks are done per-page via getServerSession
export const proxy = withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
