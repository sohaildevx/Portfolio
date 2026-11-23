import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: Request) {
  try {
    const { name, email, message, website } = await req.json();

    
    if (website) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 },
      );
    }

    const trimmedName = (name ?? "").trim();
    const trimmedEmail = (email ?? "").trim();
    const trimmedMessage = (message ?? "").trim();

    if (!trimmedName || !trimmedMessage) {
      return NextResponse.json(
        { message: "Name and message are required" },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json(
        { message: "A valid email address is required" },
        { status: 400 },
      );
    }

    if (trimmedName.length > 100 || trimmedMessage.length > 5000) {
      return NextResponse.json(
        { message: "Input too long" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: trimmedEmail,
      subject: `Portfolio contact: ${trimmedName}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
