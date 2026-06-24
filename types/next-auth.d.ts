import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      teamNumber?: string;
      teamName?: string;
      location?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    teamNumber?: string;
    teamName?: string;
    location?: string;
  }
}
