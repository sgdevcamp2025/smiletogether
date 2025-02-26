package com.smiletogether.historyserver.domain.model;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reactions {
    String emoji;
    int count;
    List<String> users;

    public List<String> getUsers() {
        return users != null ? users : new ArrayList<>();
    }

    public Reactions addReaction(String memberId) {
        List<String> updatedUsers = new ArrayList<>(getUsers()); // 기존 users 리스트 복사
        updatedUsers.add(memberId); // 새로운 사용자 추가

        return Reactions.builder()
                .emoji(this.emoji)
                .count(this.count + 1) // ✅ count 증가
                .users(updatedUsers)   // ✅ 사용자 리스트 업데이트
                .build();
    }
}
