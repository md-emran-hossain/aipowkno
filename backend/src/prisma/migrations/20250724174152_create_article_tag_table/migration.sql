-- CreateTable
CREATE TABLE "articleTag" (
    "articleId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "articleTag_pkey" PRIMARY KEY ("articleId","tagId")
);

-- AddForeignKey
ALTER TABLE "articleTag" ADD CONSTRAINT "articleTag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articleTag" ADD CONSTRAINT "articleTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
