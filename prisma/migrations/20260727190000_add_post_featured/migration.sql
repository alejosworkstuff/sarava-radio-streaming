-- AlterTable
ALTER TABLE "Post" ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Post_published_featured_idx" ON "Post"("published", "featured");
