import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

//  Configure Cloudinary with environment variables
cloudinary.config({});

//  Handle POST
export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file"); // key must match from frontend

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert the file to a base64-encoded string
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 🔹 Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "uploads" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
