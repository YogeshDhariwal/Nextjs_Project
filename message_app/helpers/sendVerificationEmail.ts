import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/Verificationemail";
import { ApiResponse } from "@/types/ApiResponse";
import { string } from "zod";

export async function sendVerificationEmail(
    email:string,
    userName:string,
    verifyCode:string
):Promise<ApiResponse>{
try {
 await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'hello world mystry message | verification code',
  react: VerificationEmail({userName,otp:verifyCode}),
});
       return  {success:true,message:"Verification email send successfully "

       }
} catch (emailerror) {
    console.log("Error sending verification email",emailerror)
    return {success:false,message:"Failed to send verification email"}
}

}