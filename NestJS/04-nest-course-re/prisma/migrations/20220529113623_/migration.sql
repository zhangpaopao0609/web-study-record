/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Coffee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coffee_name_key" ON "Coffee"("name");
