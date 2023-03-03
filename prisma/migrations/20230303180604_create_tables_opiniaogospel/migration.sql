-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT;

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentPreComment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT,
    "video" TEXT,
    "userADMId" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "id_comment" TEXT,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likeInComments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,

    CONSTRAINT "likeInComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forums" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "forums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentInForums" (
    "id" TEXT NOT NULL,
    "id_comment_forum" TEXT,
    "forum_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "commentInForums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likeInForums" (
    "id" TEXT NOT NULL,
    "forum_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "commentInForum_id" TEXT NOT NULL,

    CONSTRAINT "likeInForums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userADMId_fkey" FOREIGN KEY ("userADMId") REFERENCES "userAdm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInComments" ADD CONSTRAINT "likeInComments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInComments" ADD CONSTRAINT "likeInComments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInComments" ADD CONSTRAINT "likeInComments_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forums" ADD CONSTRAINT "forums_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentInForums" ADD CONSTRAINT "commentInForums_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "forums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentInForums" ADD CONSTRAINT "commentInForums_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInForums" ADD CONSTRAINT "likeInForums_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "forums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInForums" ADD CONSTRAINT "likeInForums_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeInForums" ADD CONSTRAINT "likeInForums_commentInForum_id_fkey" FOREIGN KEY ("commentInForum_id") REFERENCES "commentInForums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
