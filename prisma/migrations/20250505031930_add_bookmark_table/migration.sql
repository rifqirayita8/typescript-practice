/*
  Warnings:

  - Made the column `latitude` on table `Universitas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Universitas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Universitas" ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "universitasId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_universitasId_key" ON "Bookmark"("userId", "universitasId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_universitasId_fkey" FOREIGN KEY ("universitasId") REFERENCES "Universitas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
