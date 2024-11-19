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
          const response = await fetch("https://illusion-6ga5.onrender.com/api/login/", {
            method: "POST",
            body: JSON.stringify({email: credentials?.email,
              password: credentials?.password,}),
            headers: {
                "Content-Type": "application/json"
              },
            
          });

          // Extract user data from response (adjust based on your backend’s response structure)
          const user = await response.json();

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
