import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { nanoid } from "nanoid";

// In a real app, you'd use a database for this
// For this demo, we'll use a simple in-memory store
// WARNING: This is not suitable for production use
const inviteCodes = new Set<string>([
  "RFM-FOUNDING-MEMBER", // Add some initial invite codes
  "FRACTAL-MIND-BETA"
]);

const users = new Map<string, { id: string; email: string; name: string; hashedPassword: string; isAdmin: boolean }>();

// Add a default admin user
users.set("admin@rfm.ai", {
  id: nanoid(),
  email: "admin@rfm.ai",
  name: "RFM Admin",
  // In production, you would use a properly hashed password
  // This is just for demo purposes - the password is "recursiveFractalMind2025"
  hashedPassword: "$2a$12$8NtmWhJ.UPPw5jfTrdXOgO5hg2G7G9eJsH56gIqrGV7XNXh1wGr3e",
  isAdmin: true
});

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        inviteCode: { label: "Invite Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // For new user registration with invite code
        if (credentials.inviteCode && !users.has(credentials.email)) {
          // Check if invite code is valid
          if (!inviteCodes.has(credentials.inviteCode)) {
            throw new Error("Invalid invite code");
          }

          // In production, you would hash the password here
          // For this demo, we'll just use a placeholder
          const hashedPassword = credentials.password; // In reality, this would be bcrypt.hash(password, 10)
          
          // Create new user
          const newUser = {
            id: nanoid(),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            hashedPassword,
            isAdmin: false
          };

          // Add user to our "database"
          users.set(credentials.email, newUser);
          
          // Remove used invite code
          inviteCodes.delete(credentials.inviteCode);
          
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            isAdmin: newUser.isAdmin
          };
        }

        // For existing user login
        const user = users.get(credentials.email);
        if (!user) {
          throw new Error("No user found with this email");
        }

        // In production, you would use bcrypt.compare here
        const isPasswordValid = credentials.password === user.hashedPassword; // This is just for demo
        
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);