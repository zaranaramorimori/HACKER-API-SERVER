package com.teamzzong.hacker.dto;

import com.teamzzong.hacker.domain.SocialType;

public record UserInfo(
	SocialType socialType,
	String socialId,
	String nickname,
	String profileImage
) {

}
