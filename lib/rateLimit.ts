type RecordNew = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const bucket = new Map<string, RecordNew>();

export function rateLimit(ip: string){
    const now = Date.now();
    const rec = bucket.get(ip);

    if(!rec || now > rec.resetAt){
        bucket.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return { allowed: true, remaining: MAX_REQ - 1, resetAt: now + WINDOW_MS };
    }

    rec.count += 1;
    const allowed = rec.count <= MAX_REQ;
    return { allowed, remaining: Math.max(0, MAX_REQ - rec.count), resetAt: rec.resetAt };
}

