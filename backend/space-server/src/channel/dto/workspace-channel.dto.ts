export class WorkspaceChannelDto {
  channels: ChannelItemDto[];
}

export class ChannelItemDto {
  channelId: string;
  name: string;
  isPrivate: boolean;
}
