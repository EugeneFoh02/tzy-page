
"use server";

import { prisma } from "@/lib/db";
import { PaymentMethod } from "@prisma/client";
import fs from "fs";
import path from "path";

// Example file upload function (you should replace this with actual file upload logic)
async function uploadFile(file: File): Promise<string> {
  const uploadDir = path.join(process.cwd(), "uploads");
  const filePath = path.join(uploadDir, file.name);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Write the file to disk (replace with cloud upload logic if needed)
  fs.writeFileSync(filePath, fileBuffer);

  // Return the file URL or path
  return `/uploads/${file.name}`; // For local, this is the relative path; for cloud, this will be the file URL
}

export async function createPost(data: FormData) {
  const fullName = data.get("full_name") as string;
  const shirtSize = data.get("shirt_size") as string;
  const nameOnShirt = data.get("name_on_shirt") as string;
  const contactNumber = data.get("contact_number") as string;
  const paymentMethod = data.get("payment_method") as PaymentMethod;
  const paymentSlip = data.get("payment_slip") as File | null;

  let paymentSlipUrl: string | null = null;

  // If there is a payment slip, upload it and store the URL
  if (paymentSlip) {
    paymentSlipUrl = await uploadFile(paymentSlip);
  }

  const post = await prisma.post.create({
    data: {
      fullName,
      shirtSize,
      nameOnShirt,
      contactNumber,
      paymentSlip: paymentSlipUrl, // Store the URL or path
      paymentMethod,
    },
  });

  return post;
}
