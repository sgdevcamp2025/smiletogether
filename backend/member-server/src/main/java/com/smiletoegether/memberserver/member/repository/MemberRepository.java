package com.smiletoegether.memberserver.member.repository;

import com.smiletoegether.memberserver.member.domain.Member;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MemberRepository extends Repository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Member save(Member member);
}
