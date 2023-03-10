/*
  Warnings:

  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - Added the required column `contentP1` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content",
ADD COLUMN     "contentP1" TEXT NOT NULL,
ADD COLUMN     "contentP2" TEXT,
ADD COLUMN     "contentP3" TEXT,
ADD COLUMN     "contentP4" TEXT,
ADD COLUMN     "contentP5" TEXT,
ADD COLUMN     "contentP6" TEXT,
ADD COLUMN     "contentP7" TEXT;
