import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider from "next-auth/providers/credentials"
import { useRouter } from "next/navigation";
import connectToDB from "../../../../../db/connect";
import User from "../../../../../models/user";


// const router  = useRouter();

export const options: NextAuthOptions = {
  
    
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        }),
        CredentialsProvider(
          // {
          //   // The name to display on the sign in form (e.g. "Sign in with...")
          //   name: "Credentials",
          //   credentials: {
          //     username: { label: "Username", type: "text", placeholder: "jsmith" },
          //     password: { label: "Password", type: "password" }
          //   },
          //   async authorize(credentials, req) {
          //     console.log("Credentials received in authorize", credentials)
          //     let user;

          //     const code = req.body?.userCode;
          //     const email = req.body?.email;

          //     try {
          //       user = await User.findOne({email})
          //       console.log(user)
          //     } catch (error) {
          //       console.log(error)
          //     }
        
          //     if (user) {
          //       if (user.verificationCode === code){
          //         console.log(code)
          //      console.log("Returning user", user)
          //       // Any object returned will be saved in `user` property of the JWT
          //       return user
          //       }
          //       else{
          //         return null
          //       }
          //     } else {
          //       console.log("User not found", user)
          //       // If you return null then an error will be displayed advising the user to check their details.
          //       return null
        
          //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          //     }
          //   }
          // }

          // approach 2
          {
            name: "Sign in",
            credentials: {
              email: {
                label: "Email",
                type: "email",
                placeholder: "example@example.com",
              },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              const user = { id: "182198", name: "Abdullah", email: "abdullahkiani310.com" };
              return user;
            },
          }
          )
    ],
    session: {
      strategy: "jwt",
    }
//  pages: {
//     signIn:"api/auth/signin"
//  }

}