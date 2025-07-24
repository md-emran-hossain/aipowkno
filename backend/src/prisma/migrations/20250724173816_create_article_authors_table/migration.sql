-- CreateTable
CREATE TABLE "articleAuthors" (
    "articleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "articleAuthors_pkey" PRIMARY KEY ("articleId","userId")
);

-- AddForeignKey
ALTER TABLE "articleAuthors" ADD CONSTRAINT "articleAuthors_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articleAuthors" ADD CONSTRAINT "articleAuthors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
