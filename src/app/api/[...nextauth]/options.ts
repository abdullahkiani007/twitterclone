import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log(" client id " , process.env.GOOGLE_CLIENT_ID);
console.log(" secret key ",process.env.GOOGLE_CLIENT_ID);
export const options: NextAuthOptions = {
  
    
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        })
    ],

    secret : process.env.SECRET as string,

}