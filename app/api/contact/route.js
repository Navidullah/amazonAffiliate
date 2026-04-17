// app/api/contact/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Configure email transporter
    // For Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your app password (not regular password)
      },
    });

    // For other email services (SendGrid, Mailgun, etc.)
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT),
    //   secure: true,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });

    // Email content
    const mailOptions = {
      from: `"Shopyor Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || "support@shopyor.com",
      replyTo: email,
      subject: subject || `Contact Form Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject || "No Subject"}
        
        Message:
        ${message}
        
        ---
        This message was sent from the Shopyor contact form.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Message</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; background: #f3f4f6; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Subject:</td>
              <td style="padding: 8px;">${subject || "No Subject"}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #2563eb;">Message:</h3>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="color: #6b7280; font-size: 12px;">
            This message was sent from the Shopyor contact form.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send auto-reply to user
    const autoReplyOptions = {
      from: `"Shopyor Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Shopyor",
      text: `
        Dear ${name},
        
        Thank you for contacting Shopyor. We have received your message and will get back to you within 24-48 hours.
        
        Here's a copy of your message:
        ${message}
        
        Best regards,
        Shopyor Support Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Contacting Shopyor</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to us. We have received your message and will respond within <strong>24-48 hours</strong>.</p>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">Your Message:</h3>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          </div>
          
          <p>If you have any additional information to share, feel free to reply to this email.</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="color: #6b7280; font-size: 12px;">
            Best regards,<br/>
            <strong>Shopyor Support Team</strong><br/>
            <a href="https://www.shopyor.com" style="color: #2563eb;">www.shopyor.com</a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
