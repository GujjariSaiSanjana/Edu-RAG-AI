/*
  Warnings:

  - You are about to drop the column `qdrantId` on the `DocumentChunk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DocumentChunk" DROP COLUMN "qdrantId",
ADD COLUMN     "embedding" vector(384);
