import mongoose ,{Schema,Document} from 'mongoose'

export interface Message extends Document {
    content:string;
    createdAt:Date
}

const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

export interface User extends Document {
    userName:string;
    email:string;
    password:string;
    verifyCode:string;
    verfiyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    messages:Message[]
}

const userSchema:Schema<User> = new Schema({
    userName:{
        type:String,
        required:[true,"username is required"],
        unique:true
    },
    email:{
         type:String,
        required:[true,"email is required"],
        match:[/.+\@.+\..+/,"please use a valid email address"],
        unique:true
    },

    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"verify code is required"],
        unique:true
    },
   verfiyCodeExpiry:{
        type:Date,
        required:[true,"verify code is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    messages:[MessageSchema]
})



 const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model("User",userSchema)
 export default UserModel