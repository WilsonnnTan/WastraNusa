-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('unpaid', 'paid', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "PaymentTransactionStatus" AS ENUM ('pending', 'success', 'failed', 'expired');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'unpaid';

-- CreateTable
CREATE TABLE "payment_transaction" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "PaymentTransactionStatus" NOT NULL,
    "paymentUrl" TEXT,
    "vaNumber" TEXT,
    "qrCode" TEXT,
    "expiredAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_externalId_key" ON "payment_transaction"("externalId");

-- CreateIndex
CREATE INDEX "payment_transaction_orderId_idx" ON "payment_transaction"("orderId");

-- CreateIndex
CREATE INDEX "payment_transaction_externalId_idx" ON "payment_transaction"("externalId");

-- CreateIndex
CREATE INDEX "payment_transaction_status_idx" ON "payment_transaction"("status");

-- CreateIndex
CREATE INDEX "order_paymentStatus_idx" ON "order"("paymentStatus");

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
