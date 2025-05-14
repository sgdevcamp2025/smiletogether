package com.smiletogether.notificationserver.repository;

import com.smiletogether.notificationserver.domain.NotificationPushSubscription;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationPushSubscriptionRepository extends JpaRepository<NotificationPushSubscription, String> {
    boolean existsByToken(String token);
    List<NotificationPushSubscription> findAllByUserId(String userId);
}

