/*
  Warnings:

  - Made the column `slug` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "slug" SET NOT NULL;
