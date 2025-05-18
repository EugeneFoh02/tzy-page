-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "fullName1" TEXT NOT NULL,
    "fullName2" TEXT,
    "ic1" TEXT NOT NULL,
    "ic2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
