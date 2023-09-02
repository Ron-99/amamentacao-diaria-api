/*
  Warnings:

  - You are about to drop the column `start_at` on the `History` table. All the data in the column will be lost.
  - Added the required column `started_at` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "start_at",
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL;
