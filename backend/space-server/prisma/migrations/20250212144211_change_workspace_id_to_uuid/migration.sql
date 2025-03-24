-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "Workspace" (
    "workspace_id" UUID NOT NULL DEFAULT uuid_generate_v1mc(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workspace_image" TEXT NOT NULL DEFAULT 'default.jpg',

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("workspace_id")
);

-- CreateTable
CREATE TABLE "WorkspaceUser" (
    "profile_id" UUID NOT NULL DEFAULT uuid_generate_v1mc(),
    "user_id" UUID NOT NULL,
    "workspace_id" UUID NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_image" TEXT NOT NULL DEFAULT 'default.jpg',
    "profile_name" TEXT NOT NULL,

    CONSTRAINT "WorkspaceUser_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "channel_id" UUID NOT NULL DEFAULT uuid_generate_v1mc(),
    "workspace_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("channel_id")
);

-- CreateTable
CREATE TABLE "ChannelUser" (
    "mapping_id" UUID NOT NULL DEFAULT uuid_generate_v1mc(),
    "user_id" UUID NOT NULL,
    "channel_id" UUID NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channel_role" TEXT NOT NULL DEFAULT 'member',

    CONSTRAINT "ChannelUser_pkey" PRIMARY KEY ("mapping_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceUser_user_id_workspace_id_key" ON "WorkspaceUser"("user_id", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelUser_user_id_channel_id_key" ON "ChannelUser"("user_id", "channel_id");

-- AddForeignKey
ALTER TABLE "WorkspaceUser" ADD CONSTRAINT "WorkspaceUser_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workspace"("workspace_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workspace"("workspace_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelUser" ADD CONSTRAINT "ChannelUser_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("channel_id") ON DELETE CASCADE ON UPDATE CASCADE;
