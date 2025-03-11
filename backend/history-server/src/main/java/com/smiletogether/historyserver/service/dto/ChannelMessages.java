package com.smiletogether.historyserver.service.dto;

import com.smiletogether.historyserver.service.dto.response.ChannelMessageResponse;
import java.util.List;
import java.util.Map;

public record ChannelMessages(
        String channelId,
        Map<String, List<ChannelMessageResponse>> groupedMessages
) {

}
