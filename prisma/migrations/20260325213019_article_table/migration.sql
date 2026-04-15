-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "province" TEXT NOT NULL,
    "island" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "ethnicGroup" TEXT,
    "clothingType" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "wikipediaPageId" TEXT NOT NULL,
    "wikipediaUrl" TEXT NOT NULL,
    "wikimediaImageUrl" TEXT,
    "wikimediaVideoUrl" TEXT,
    "wikipediaLastSync" TIMESTAMP(3),
    "summary" TEXT,
    "status" "ArticleStatus" NOT NULL DEFAULT 'published',
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_slug_key" ON "article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "article_wikipediaPageId_key" ON "article"("wikipediaPageId");

-- CreateIndex
CREATE INDEX "article_province_idx" ON "article"("province");

-- CreateIndex
CREATE INDEX "article_ethnicGroup_idx" ON "article"("ethnicGroup");

-- CreateIndex
CREATE INDEX "article_clothingType_idx" ON "article"("clothingType");

-- CreateIndex
CREATE INDEX "article_status_province_idx" ON "article"("status", "province");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "article_section" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageLabel" TEXT,
    "imageCaption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "article_section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "article_section_articleId_idx" ON "article_section"("articleId");

-- AddForeignKey
ALTER TABLE "article_section" ADD CONSTRAINT "article_section_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
