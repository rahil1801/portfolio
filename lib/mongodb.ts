import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define the MongoDB URL")
}

type Cached = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

let cached: Cached = (global as any)._mongoose || { conn: null, promise:null };

export async function connectDB(){
    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;
    (global as any)._mongoose = cached;
    return cached.conn;
}