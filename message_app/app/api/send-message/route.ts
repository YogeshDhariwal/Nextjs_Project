import dbConnect from "@/lib/dbConnect";
import UserModel,{ Message } from "@/models/User.model";

export async function POST(request:Request) {
    await dbConnect()

    const {userName ,content} = await request.json()
 try {
     const user  = await UserModel.findOne(
      { userName}
     )
     if(!user){
       return Response.json(
           {
               success:false,
               message:"User not found"
           },
           {status:404}
       )
     }
     //  is user accepting messages or not
     if(!user.isAcceptingMessages){
 return Response.json(
           {
               success:false,
               message:"User is not accepting messages"
           },
           {status:403}
       )
     }

     const newMessage = {content,createdAt:new Date()}
     user.messages.push(newMessage as Message)
     await user.save()
      return Response.json(
           {
               success:true,
               message:"Message Sent Successfully"
           },
           {status:200}
       )
 } catch (error) {
    console.log("Error  adding messages",error)
     return Response.json(
           {
               success:false,     
               message:"Internal server error"
           },
           {status:500}
       )
 }                     

}