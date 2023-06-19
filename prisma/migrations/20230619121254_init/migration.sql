/*
  Warnings:

  - You are about to drop the column `laptopManufacturer` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `laptopModel` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "laptopManufacturer",
DROP COLUMN "laptopModel",
DROP COLUMN "serialNumber";
