package com.smiletogether.chatserver.service;

import com.smiletogether.chatserver.service.dto.ChannelMessageReaction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmojiService {
    private final EmojiProducer emojiProducer;
    public void sendEmoji(ChannelMessageReaction reaction) {
        if (reaction.type().equals("CREATE")) {
            emojiProducer.createEmoji(reaction);
        }
        if (reaction.type().equals("DELETE")) {
            emojiProducer.deleteEmoji(reaction);
        }
    }
}
