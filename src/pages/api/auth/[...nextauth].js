// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" }, // Changed to email
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Make a POST request to your custom backend's authentication endpoint
          const response = await fetch("https://api-dev.segura-pay.com/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({username: credentials?.username,
              password: credentials?.password,}),
            headers: {
                "Content-Type": "application/json"
              },
          });

          // Extract user data from response (adjust based on your backend’s response structure)
          const user = await response.json();
          console.log(user);
          // const decoded

          if (response.ok && user?.data) {
            // Return user data if login is successful
            console.log(user.data);
            return user.data;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null; // Authentication failed
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/error', // Error page if authentication fails
  },
  session: {
    strategy: "jwt", // Storing session as a JWT
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token
      if (user) {
        token.accessToken = user.access_token;
        token.permissions = user.user.permissions;
        token.id = user.user.id;
        token.username = user.user.username;
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
      };
      return session;
    },
  },
});
