import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { rateLimit } from "@/lib/rateLimit";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

const contactSchema = z.object({
    firstName: z.string().trim().min(2).max(100),
    lastName: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(200),
    subject: z.string().trim().min(5).max(200),
    message: z.string().trim().min(5).max(5000),
}).strict();

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  return xf?.split(",")[0].trim() || "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { firstName, lastName, email, subject, message } = parsed.data;

    await connectDB();
    await Contact.create({ firstName, lastName, email, subject, message });

    const response = await sendContactEmail(firstName, lastName, email, subject, message);

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
