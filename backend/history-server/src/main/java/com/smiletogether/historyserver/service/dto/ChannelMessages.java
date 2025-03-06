package com.smiletogether.historyserver.service.dto;

import java.util.List;
import java.util.Map;

public record ChannelMessages(
        String channelId,
        Map<String, List<ChannelMessageResponse>> groupedMessages
) {

}
