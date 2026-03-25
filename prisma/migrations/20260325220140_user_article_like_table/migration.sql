-- CreateTable
CREATE TABLE "user_article_like" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_article_like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_article_like_articleId_idx" ON "user_article_like"("articleId");

-- CreateIndex
CREATE INDEX "user_article_like_userId_idx" ON "user_article_like"("userId");

-- AddForeignKey
ALTER TABLE "user_article_like" ADD CONSTRAINT "user_article_like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_article_like" ADD CONSTRAINT "user_article_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
