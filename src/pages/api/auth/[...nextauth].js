// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" }, // Changed to email
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Make a POST request to your custom backend's authentication endpoint
          const response = await fetch("http://your-backend-url/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email: credentials?.email,
              password: credentials?.password,}),
            headers: {
                "Content-Type": "application/json"
              },
            
          });

          // Extract user data from response (adjust based on your backend’s response structure)
          const user = response.data.user;

          if (user) {
            // Return user data if login is successful
            return user;
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
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error page if authentication fails
  },
  session: {
    strategy: "jwt", // Storing session as a JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // Add any other user info you need
      }
      return token;
    },
    async session({ session, token }) {
      // Make token data available in session
      session.user = token;
      return session;
    },
  },
});
