-- AlterTable
ALTER TABLE "Comment" ADD COLUMN IF NOT EXISTS "pageKey" TEXT;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Comment_pageKey_createdAt_idx" ON "Comment"("pageKey", "createdAt");
