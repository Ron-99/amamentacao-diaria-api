-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "baby_name" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3),

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreastHistory" (
    "id" TEXT NOT NULL,
    "isLeft" BOOLEAN NOT NULL DEFAULT true,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "historyId" TEXT NOT NULL,

    CONSTRAINT "BreastHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BreastHistory" ADD CONSTRAINT "BreastHistory_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
