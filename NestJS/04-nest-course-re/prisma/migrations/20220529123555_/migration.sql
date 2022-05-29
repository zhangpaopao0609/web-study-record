/*
  Warnings:

  - You are about to drop the column `flavors` on the `Coffee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "flavors";

-- CreateTable
CREATE TABLE "Flavor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Flavor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoffeeOnFlavor" (
    "coffeeId" INTEGER NOT NULL,
    "flavorId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CoffeeOnFlavor_pkey" PRIMARY KEY ("coffeeId","flavorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flavor_name_key" ON "Flavor"("name");

-- AddForeignKey
ALTER TABLE "CoffeeOnFlavor" ADD CONSTRAINT "CoffeeOnFlavor_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeeOnFlavor" ADD CONSTRAINT "CoffeeOnFlavor_flavorId_fkey" FOREIGN KEY ("flavorId") REFERENCES "Flavor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
