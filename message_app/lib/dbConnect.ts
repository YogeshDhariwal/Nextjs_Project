import mongoose from 'mongoose'

type ConnectionObject ={
    isConnected?:number
}
const connection: ConnectionObject ={}

async function dbConnect():Promise<void>{
  if(connection.isConnected){
    console.log("Already connected to database")
  return
} 
  
try {
  const db =  await mongoose.connect(process.env.MONGODB_URI || '',{})  // {} options - bufferstream,auth.user,auth.password,autoindex,dbname,maxpoolsize(max socket),minpoolsize,family(ipv4,ipv6)
 
connection.isConnected=db.connections[0].readyState
 //console.log(db)
  // console.log("db.connection",db.connections)
console.log("DB connected succesfully")
} catch (error) {
    console.log('DB connection failed',error)
    process.exit(1)
}
}

export default dbConnect;