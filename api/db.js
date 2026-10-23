import mongoose from 'mongoose'
let cached = global.__tmgMongo
if (!cached) cached = global.__tmgMongo = { conn:null, promise:null }
export async function connectDB(){if(cached.conn)return cached.conn;if(!cached.promise){cached.promise=mongoose.connect(process.env.MONGODB_URI).then(m=>m)}cached.conn=await cached.promise;return cached.conn}
