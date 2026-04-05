import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request){
    await dbConnect()

    try {
 const {userName,password,email}=  await request.json()
 const existingUserVerificationByUsername = await UserModel.findOne({
    userName,
    isVerified:true
 }) 
   if(existingUserVerificationByUsername){
    return Response.json({
        success:false,
        message:"username is already existed"
    }),{status:400}
   }

   const existingUserByEmail = await UserModel.findOne({
    email
   })
   
   const verifyCode = Math.floor(100000+Math.random()*900000).toString()


   if(existingUserByEmail){
   }
  else{
  const hashedPassword =  await bcrypt.hash(password,10)
  const expiryDate = new Date()
  expiryDate.setHours(expiryDate.getHours()+1)
  const newUser = new UserModel({
        userName,
        email,
        password:hashedPassword,
        verifyCode,
        verfiyCodeExpiry:expiryDate,
        isVerified:false,
        isMessageAccept:true,
        messages:[]
  })

   await newUser.save()
  }
   
  // send verificaiton email
const emailResponse =   await sendVerificationEmail(
   email,
   userName,
   verifyCode
  )
if(!emailResponse.success){
   
}


    } catch (error) {
         console.log("Error regestring user",error)
         return Response.json({
            success:false,
            message:"Error regestring the user"
         },
         {
            status:500
         }
        )
    }
}

