package com.teamzzong.hacker.dto;

import com.teamzzong.hacker.domain.SocialType;

public record LoginUserInfoResponse(
	SocialType socialType,
	String socialId,
	String username,
	String profileImage
) {

	public static LoginUserInfoResponse from(UserInfo userInfo) {
		return new LoginUserInfoResponse(
			userInfo.socialType(),
			userInfo.socialId(),
			userInfo.nickname(),
			userInfo.profileImage()
		);
	}
}
