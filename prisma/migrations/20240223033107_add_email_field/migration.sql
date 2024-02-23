/*
  Warnings:

  - Added the required column `email` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedulings" ADD COLUMN     "email" TEXT NOT NULL;
