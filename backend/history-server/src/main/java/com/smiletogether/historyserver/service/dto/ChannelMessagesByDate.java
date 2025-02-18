package com.smiletogether.historyserver.service.dto;

import java.util.List;

public record ChannelMessagesByDate(
    List<ChannelMessageSaveRequest> messagesByDate
) {

}
