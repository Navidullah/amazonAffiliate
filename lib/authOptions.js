// /lib/authOptions.js
/*
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-adapter";
import User from "@/lib/models/User";
import { ConnectToDB } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectToDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) return null;
        return {
          id: user._id.toString(),
          name: user.name || user.email.split("@")[0],
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      if (!token.role && token.email) {
        await ConnectToDB();
        const dbUser = await User.findOne({ email: token.email });
        token.role = dbUser?.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role || "user";
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      await ConnectToDB();
      await User.findOneAndUpdate(
        { email: user.email },
        { $set: { role: "user" } },
        { new: true }
      );
    },
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
*/
// /lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import PinterestProvider from "next-auth/providers/pinterest"; // ✅ use built-in provider
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-adapter";
import User from "@/lib/models/User";
import { ConnectToDB } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // --- Pinterest (built-in) ---
    PinterestProvider({
      clientId: process.env.PINTEREST_APP_ID,
      clientSecret: process.env.PINTEREST_APP_SECRET,
      // Optional: ensure write scopes for posting Pins
      authorization: {
        params: {
          scope:
            "pins:read pins:write boards:read boards:write user_accounts:read",
        },
      },
    }),

    // --- Credentials ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectToDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id: user._id.toString(),
          name: user.name || user.email.split("@")[0],
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // keep your app's user fields
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      if (!token.role && token.email) {
        await ConnectToDB();
        const dbUser = await User.findOne({ email: token.email });
        token.role = dbUser?.role || "user";
      }

      // capture Pinterest tokens on OAuth login
      if (account?.provider === "pinterest") {
        token.pinterestAccessToken = account.access_token;
        token.pinterestRefreshToken = account.refresh_token ?? null;
        token.pinterestScope = account.scope ?? null;
        token.pinterestTokenType = account.token_type ?? "Bearer";
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role || "user";
        session.pinterestAccessToken = token.pinterestAccessToken || null;
        session.pinterestRefreshToken = token.pinterestRefreshToken || null;
      }
      return session;
    },
  },

  events: {
    async createUser({ user }) {
      await ConnectToDB();
      await User.findOneAndUpdate(
        { email: user.email },
        { $set: { role: "user" } },
        { new: true }
      );
    },
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
};
