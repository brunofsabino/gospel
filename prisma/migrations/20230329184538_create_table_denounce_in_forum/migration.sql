-- CreateTable
CREATE TABLE "denouncesInForum" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nameUser" TEXT NOT NULL,
    "userDenounced_id" TEXT,
    "nameUserDenounced" TEXT,
    "textDenounce" TEXT,
    "describingDenounce" TEXT,
    "forum_id" TEXT,
    "id_comment" TEXT,
    "id_response_comment" TEXT,
    "id_forum" TEXT,
    "id_forum_comment" TEXT,
    "id_forum_comment_response" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "denouncesInForum_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "denouncesInForum" ADD CONSTRAINT "denouncesInForum_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
