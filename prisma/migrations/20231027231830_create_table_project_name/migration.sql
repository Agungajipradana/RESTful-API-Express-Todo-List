/*
  Warnings:

  - Added the required column `userId` to the `project_names` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project_names" DROP CONSTRAINT "project_names_id_fkey";

-- AlterTable
ALTER TABLE "project_names" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "project_names" ADD CONSTRAINT "project_names_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
