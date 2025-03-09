package com.smiletogether.historyserver.service.dto.request;

import java.time.LocalDateTime;

public record ChannelMessagesRequest(
        LocalDateTime lastTimeStamp
) {

}
