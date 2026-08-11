import "server-only";
import { Db, MongoClient } from "mongodb";
const uri=process.env.MONGODB_URI;
const globalMongo=globalThis as typeof globalThis&{__futurexMongo?:Promise<MongoClient>};
export async function mongoClient(){if(!uri)throw new Error("CONFIG_MONGODB");if(!globalMongo.__futurexMongo)globalMongo.__futurexMongo=new MongoClient(uri,{maxPoolSize:10}).connect();return globalMongo.__futurexMongo}
export async function database():Promise<Db>{const client=await mongoClient();return client.db(process.env.MONGODB_DATABASE||"futurex_studio")}
