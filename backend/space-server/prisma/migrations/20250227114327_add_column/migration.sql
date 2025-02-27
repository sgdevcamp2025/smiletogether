-- AlterTable
ALTER TABLE "WorkspaceUser" ADD COLUMN     "position" TEXT,
ADD COLUMN     "status_message" TEXT,
ALTER COLUMN "profile_name" DROP NOT NULL;
