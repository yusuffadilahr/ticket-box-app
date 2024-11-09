/*
  Warnings:

  - Added the required column `expiredAt` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `expiredAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transactionstatus` MODIFY `status` ENUM('WAITING_FOR_PAYMENT', 'PAID', 'CANCELLED', 'EXPIRED') NOT NULL;
