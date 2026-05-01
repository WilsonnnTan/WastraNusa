-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('active', 'inactive', 'out_of_stock');

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "island" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "clothingType" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'active',
    "sold" INTEGER NOT NULL DEFAULT 0,
    "imageURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_key" ON "product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_sku_key" ON "product"("sku");

-- CreateIndex
CREATE INDEX "product_island_idx" ON "product"("island");

-- CreateIndex
CREATE INDEX "product_province_idx" ON "product"("province");

-- CreateIndex
CREATE INDEX "product_clothingType_idx" ON "product"("clothingType");

-- CreateIndex
CREATE INDEX "product_gender_idx" ON "product"("gender");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
