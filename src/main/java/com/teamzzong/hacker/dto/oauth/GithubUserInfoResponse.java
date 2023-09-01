package com.teamzzong.hacker.dto.oauth;

import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.UserInfo;

public record GithubUserInfoResponse(
	String id,
	String login,
	String avatarUrl
) {

	public UserInfo toUserInfo() {
		return new UserInfo(
			SocialType.GITHUB,
			id,
			login,
			avatarUrl
		);
	}
}
