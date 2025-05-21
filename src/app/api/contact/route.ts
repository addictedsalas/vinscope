import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { name?: string; email?: string; subject?: string; message?: string };
    const { name, email, subject, message } = body;
    
    // Validate the form data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    
    // In a real application, you would send an email or store the contact request
    // For now, we'll just log it and return a success message
    console.log("Contact form submission:", { 
      name: name ?? '', 
      email: email ?? '', 
      subject: subject ?? '', 
      message: message ?? '' 
    });
    
    // Simulate a delay to make it feel like something is happening
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(
      { success: true, message: "Thank you for your message! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
