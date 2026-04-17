import {success, z} from "zod";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { userNameValidation } from "@/schemas/signUpSchema";
 

const UsernameQuerySchema = z.object({
    userName:userNameValidation
})

export async function GET(request :Request){
   
    await dbConnect ()
    try {
       
       const {searchParams}= new URL(request.url)
       const queryParam ={
        userName:searchParams.get('userName')
       } 
       // validation with zod 
       const result = UsernameQuerySchema.safeParse(queryParam)
       console.log("check username with zod",result)

       if(!result.success){
        const usernameErrors = result.error.format().userName?._errors ||[]
        return Response.json(
            {
          success:false,
          message:usernameErrors?.length>0?usernameErrors.join(', ')
          :'Invalid query parameter'
            },
            {status:400}
        )
       }
      
       const {userName} = result.data
    const existingUserVerified =  await UserModel.findOne({userName,isVerified:true})
    if(existingUserVerified){
       return Response.json(
        {
        success:false,
        messaage:"userName is already taken"
        },
        {status:400}
       )
    }
 
      return Response.json(
        {
        success:true,
        messaage:"userName is available"
        },
        {status:200}
       )
    } catch (error) {
        console.log("Error in checking userName",error);
        return Response.json(
            {
                success:false,
                message:"Error checking userName"
            },
            {  status:500 }
        )
    }
}

