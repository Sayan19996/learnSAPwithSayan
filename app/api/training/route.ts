import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Try to load nodemailer dynamically to avoid build-time issues
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, training, message } = body;

    const to = process.env.TRAINING_RECEIVER || "sayansamanta1996@gmail.com";

    const text = `Training application\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nTraining: ${training}\nMessage: ${message || ""}\n`;

    // Try to send via SMTP if nodemailer and SMTP config available

    let transporter: any = null;
    try {
      const nodemailerModule = await import('nodemailer');
      const nodemailer = nodemailerModule.default || nodemailerModule;
      if (nodemailer && process.env.SMTP_HOST && process.env.SMTP_USER) {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: !!process.env.SMTP_SECURE,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      }
    } catch (e) {
      console.error("Nodemailer import error:", e);
      transporter = null;
    }

    if (transporter) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: `Training application from ${name}`,
        text,
      });

      return NextResponse.json({ ok: true });
    }

    // Fallback: Log to console instead of file system (Vercel is read-only)
    console.log("Training Submission (Fallback):", JSON.stringify({ date: new Date().toISOString(), name, email, phone, training, message }));

    return NextResponse.json({ ok: true, note: "logged_to_console" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
