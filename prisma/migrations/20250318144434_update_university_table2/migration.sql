/*
  Warnings:

  - You are about to drop the column `akreditasi` on the `Universitas` table. All the data in the column will be lost.
  - You are about to drop the column `lokasi` on the `Universitas` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Universitas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Universitas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accreditation` to the `Universitas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Universitas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Universitas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Universitas_nama_key";

-- AlterTable
ALTER TABLE "Universitas" DROP COLUMN "akreditasi",
DROP COLUMN "lokasi",
DROP COLUMN "nama",
ADD COLUMN     "accreditation" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Universitas_name_key" ON "Universitas"("name");
