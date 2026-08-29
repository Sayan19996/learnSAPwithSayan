import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Try to load nodemailer dynamically to avoid build-time issues
let nodemailer: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  nodemailer = require("nodemailer");
} catch (e) {
  nodemailer = null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, training, message } = body;

    const to = process.env.TRAINING_RECEIVER || "sayansamanta1996@gmail.com";

    const text = `Training application\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nTraining: ${training}\nMessage: ${message || ""}\n`;

    if (nodemailer && process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: !!process.env.SMTP_SECURE, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: `Training application from ${name}`,
        text,
      });

      return NextResponse.json({ ok: true });
    }

    // Fallback: append to a local log file
    const dataDir = path.resolve(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const logFile = path.join(dataDir, "training-submissions.log");
    const entry = { date: new Date().toISOString(), name, email, phone, training, message };
    fs.appendFileSync(logFile, JSON.stringify(entry) + "\n");

    return NextResponse.json({ ok: true, note: "saved_locally" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
