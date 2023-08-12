import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

let providers = [];

if (process.env.VERCEL_ENV === "preview") {
  providers = [
    ...providers,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === "user" &&
          credentials.password === "password"
        ) {
          return {
            id: "1",
            name: "TestUser",
            email: "YOUR-EMAIL-USED@github",
          };
        } else {
          return null;
        }
      },
    })
  ];
} else {
  providers = [
    ...providers,
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // AnotherProvider({ ... }),
  ];
}

export const authOptions = {
  providers,
};

export default NextAuth(authOptions);
