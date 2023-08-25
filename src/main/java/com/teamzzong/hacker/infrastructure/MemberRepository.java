package com.teamzzong.hacker.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamzzong.hacker.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
