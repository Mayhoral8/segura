import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" }, 
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
         
          const response = await fetch(
            "https://api-dev.segura-pay.com/api/v1/auth/login",
            {
              method: "POST",
              body: JSON.stringify({
                username: credentials?.email,
                password: credentials?.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          
          const user = await response.json();
          
          // const decoded

          if (response.ok && user?.data) {
            // Return user data if login is successful
            console.log(user.data);
            return user.data;
          } else {
            throw new Error(user?.message || "Invalid login credentials");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login", 
  },
  session: {
    strategy: "jwt", // Storing session as a JWT
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token
      if (user) {
        token.accessToken = user.access_token;
        token.permissions = user.user.permissions;
        token.id = user.user.id;
        token.username = user.user.username;
        token.corporateAdminEmail = user.corporateEmail
      }
      return token;
    },
    async session({ session, token }) {
      // Make token data available in session
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        permissions: token.permissions,
        id: token.id,
        username: token.username,
        corporateAdminEmail: token.corporateAdminEmail
      };
      return session;
    },
  },
});
