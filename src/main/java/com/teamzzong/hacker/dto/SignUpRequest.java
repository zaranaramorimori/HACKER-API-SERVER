package com.teamzzong.hacker.dto;

import com.teamzzong.hacker.domain.SocialType;

public record SignUpRequest(
	SocialType socialType,
	String socialId,
	String username,
	String nickname
) {
}
