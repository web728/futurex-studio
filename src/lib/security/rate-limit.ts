import "server-only";
type Result={allowed:boolean;remaining:number;reset:number};
const memory=(globalThis as typeof globalThis&{__futurexLimits?:Map<string,{count:number;reset:number}>}).__futurexLimits??=new Map();
export async function rateLimit(key:string):Promise<Result>{
  const max=Number(process.env.RATE_LIMIT_MAX_REQUESTS||5),windowSeconds=Number(process.env.RATE_LIMIT_WINDOW_SECONDS||600);
  const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(url&&token){const redisKey=`futurex:forms:${key}`;const res=await fetch(`${url}/pipeline`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify([["INCR",redisKey],["EXPIRE",redisKey,windowSeconds,"NX"],["TTL",redisKey]])});if(!res.ok)throw new Error("RATE_LIMIT_PROVIDER");const data=await res.json() as {result:number}[];const count=Number(data[0]?.result||0),ttl=Number(data[2]?.result||windowSeconds);return{allowed:count<=max,remaining:Math.max(0,max-count),reset:Date.now()+ttl*1000}}
  if(process.env.NODE_ENV==="production")throw new Error("CONFIG_RATE_LIMIT");
  const now=Date.now(),current=memory.get(key);if(!current||current.reset<now){memory.set(key,{count:1,reset:now+windowSeconds*1000});return{allowed:true,remaining:max-1,reset:now+windowSeconds*1000}}current.count++;return{allowed:current.count<=max,remaining:Math.max(0,max-current.count),reset:current.reset};
}
