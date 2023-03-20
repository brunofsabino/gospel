-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "likeShow" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "likeInResponseComments" ADD COLUMN     "likeShow" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "response_comments" ADD COLUMN     "likeShow" BOOLEAN DEFAULT false;
