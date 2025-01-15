-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('bank', 'tng', 'other');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "shirtSize" TEXT NOT NULL,
    "nameOnShirt" TEXT,
    "contactNumber" TEXT NOT NULL,
    "paymentSlip" TEXT,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
