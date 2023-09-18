import NextAuth from "next-auth";
import { options } from "./options";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../../db/client";
const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  ...options,
});

export { handler as GET, handler as POST };
