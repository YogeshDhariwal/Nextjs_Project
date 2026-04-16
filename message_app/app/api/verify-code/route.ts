import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {userName,code} = await request.json()
     const decodedUserName =  decodeURIComponent(userName)
  const user =  await  UserModel.findOne({userName;decodedUserName})
  if(!user){
    return Response.json(
         {
                success:false,
                message:"user not found"
            },
            {  status:500 }  
    )
  }
  const isCodeValid = user.verifyCode==code
  const isCodeNotExpire =  new Date(user.verfiyCodeExpiry) > new Date()
  if(isCodeValid && isCodeNotExpire){
   user.isVerified=true
   await user.save()

   return Response.json(
         {
                success:true,
                message:"Account verified successfully"
            },
            {  status:200 }  
    )
  }
   else if(!isCodeNotExpire){
    return Response.json(
         {
                success:false,
                message:"Verification code has expired ,please signup again to get new code"
            },
            {  status:400 }  
    )
   }
   else{
    return Response.json(
         {
                success:false,
                message:"Incorrect Verification code"
            },
            {  status:400 }  
    )
   }
    } catch (error) {
         console.log("Error in verifying ",error);
        return Response.json(
            {
                success:false,
                message:"Error in verifying "
            },
            {  status:500 }
        )
    }
}