package com.smiletogether.historyserver.service.dto;

import java.time.LocalDateTime;

public record ChannelMessagesRequest(
        LocalDateTime lastTimeStamp
) {

}
