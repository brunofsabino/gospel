-- CreateTable
CREATE TABLE "denounces" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nameUser" TEXT NOT NULL,
    "userDenounced_id" TEXT NOT NULL,
    "nameUserDenounced" TEXT NOT NULL,
    "post_id" TEXT,
    "id_comment" TEXT,
    "id_response_comment" TEXT,
    "textDenounce" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "denounces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "denounces" ADD CONSTRAINT "denounces_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
