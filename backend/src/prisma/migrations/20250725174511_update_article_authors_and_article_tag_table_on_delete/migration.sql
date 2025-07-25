-- DropForeignKey
ALTER TABLE "articleAuthors" DROP CONSTRAINT "articleAuthors_articleId_fkey";

-- DropForeignKey
ALTER TABLE "articleTag" DROP CONSTRAINT "articleTag_articleId_fkey";

-- AddForeignKey
ALTER TABLE "articleAuthors" ADD CONSTRAINT "articleAuthors_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articleTag" ADD CONSTRAINT "articleTag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
