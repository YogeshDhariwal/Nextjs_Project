import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { userName: credentials.identifier }
                        ]
                    })
                    if (!user) {
                        throw new Error("No user is found with this email")
                    }
                    if (!user.isVerified) {
                        throw new Error("User is not verifed yet")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect Password ")              
                    }
                    else {                 
                        return user;          
                    }       
                } catch (error: any) {                
                    throw new Error(error)         
                }

            }
        })
    ],
    callbacks:{
   async session({ session,  token }) {
    if(token){
        session.user._id = token._id
        session.user.isVerified=token.isVerified
        session.user.userName =token.userName
        session.user.isMessageAccept = token.isMessageAccept
    }
      return session
    },
    async jwt({ token, user }) {
        if(user){
      token._id = user._id?.toString()
      token.isVerified = user.isVerified
      token.isMessageAccept = user.isMessageAccept
      token.userName= user.userName
        }
      return token
    }
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,

}