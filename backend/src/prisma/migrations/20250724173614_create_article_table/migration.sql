-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" JSONB,
    "contentText" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
    "coverImage" VARCHAR(255),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_slug_key" ON "article"("slug");
