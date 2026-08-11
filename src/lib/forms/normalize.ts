export function normalizeFields(fields:Record<string,unknown>){
  return Object.fromEntries(Object.entries(fields).map(([key,value])=>[key,typeof value==="string"?value.replace(/\0/g,"").trim().replace(/[ \t]+/g," "):value]));
}
export function normalizedPhone(value:unknown){if(typeof value!=="string")return undefined;const prefix=value.trim().startsWith("+")?"+":"";const digits=value.replace(/\D/g,"");return digits.length>=8?`${prefix}${digits}`:undefined}
export function publicFields(fields:Record<string,unknown>){const copy={...fields};delete copy.website;return copy}
