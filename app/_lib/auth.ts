import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getTeamByEmail } from "./partspool-data";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, session }) {
      // Always fetch fresh team info from the sheet (handles post-onboarding refresh)
      if (token.email) {
        const team = await getTeamByEmail(token.email);
        if (team) {
          token.teamNumber = team.team_number;
          token.teamName = team.team_name;
          token.location = team.location;
        }
      }
      // After onboarding, the client calls update() to override with form values
      if (trigger === "update" && session) {
        token.teamNumber = session.teamNumber ?? token.teamNumber;
        token.teamName = session.teamName ?? token.teamName;
        token.location = session.location ?? token.location;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.teamNumber = (token.teamNumber as string) ?? "";
        session.user.teamName = (token.teamName as string) ?? "";
        session.user.location = (token.location as string) ?? "";
      }
      return session;
    },
  },
};
