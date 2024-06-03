/*
  Warnings:

  - Changed the type of `auth_type` on the `Merchant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MerchantAuthType" AS ENUM ('Google', 'Github');

-- CreateEnum
CREATE TYPE "UserAuthType" AS ENUM ('Credential', 'Google', 'Github');

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "auth_type",
ADD COLUMN     "auth_type" "MerchantAuthType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_type" "UserAuthType" NOT NULL DEFAULT 'Credential',
ALTER COLUMN "password" DROP NOT NULL;

-- DropEnum
DROP TYPE "AuthType";
