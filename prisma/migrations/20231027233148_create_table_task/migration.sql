/*
  Warnings:

  - Added the required column `projectNameId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_id_fkey";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "projectNameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectNameId_fkey" FOREIGN KEY ("projectNameId") REFERENCES "project_names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
