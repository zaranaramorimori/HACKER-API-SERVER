package com.teamzzong.hacker.infrastructure;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamzzong.hacker.domain.Member;
import com.teamzzong.hacker.domain.SocialType;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

	Optional<Member> findByNickname(String nickname);
}
