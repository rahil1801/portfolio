import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY!;
const MAIL_TO = process.env.RECEIVER_EMAIL!;

if (!resendApiKey) throw new Error("Missing RESEND_API_KEY");
if (!MAIL_TO) throw new Error("Missing MAIL_TO");

const resend = new Resend(resendApiKey);

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildEmailHTML(firstName: string, lastName: string, email: string, subject: string, message: string) {
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>New Contact</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;background:#f6f8fb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);overflow:hidden;">
          <tr>
            <td style="background:#0f172a;color:#ffffff;padding:20px 24px;">
              <h1 style="margin:0;font-size:20px;">New Contact Submission</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 0;width:120px;color:#64748b;font-weight:600;">Name</td>
                  <td style="padding:12px 0;color:#0f172a;">${esc(firstName)} ${esc(lastName)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;width:120px;color:#64748b;font-weight:600;">Email</td>
                  <td style="padding:12px 0;"><a href="mailto:${esc(email)}" style="color:#2563eb;text-decoration:none;">${esc(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 0;width:120px;color:#64748b;font-weight:600;vertical-align:top;">Message</td>
                  <td style="padding:12px 0;color:#0f172a;white-space:pre-wrap;line-height:1.6;">${esc(subject)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;width:120px;color:#64748b;font-weight:600;vertical-align:top;">Message</td>
                  <td style="padding:12px 0;color:#0f172a;white-space:pre-wrap;line-height:1.6;">${esc(message)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f1f5f9;color:#475569;padding:16px 24px;font-size:12px;">
              <div>Sent from your portfolio contact form | Nibras</div>
            </td>
          </tr>
        </table>
        <div style="color:#94a3b8;font-size:12px;padding-top:12px;">© ${new Date().getFullYear()} Nibras | Portfolio</div>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function sendContactEmail(firstName: string, lastName: string, email: string, subject: string, message: string) {
  const html = buildEmailHTML(firstName, lastName, email, subject, message);

  try{
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: MAIL_TO,
      subject: "New Contact Form Received on Nibras | Portfolio",
      html,
      text: `Name: ${firstName}\nEmail: ${email}\n\n${message}`,
    });
  
    if(error){
      return Response.json({ error }, { status: 500 });
    }
  
    return Response.json(data);
  }
  catch(error){
    return Response.json({ error }, { status: 500 });
  }
}
