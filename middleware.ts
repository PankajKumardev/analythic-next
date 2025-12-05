import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // User must have a valid token to access protected routes
      return !!token;
    },
  },
});

// Protect these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/stats/:path*",
    "/upgrade/:path*"
  ],
};
