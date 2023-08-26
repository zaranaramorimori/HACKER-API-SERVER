package com.teamzzong.hacker.dto.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.UserInfo;

public record GithubUserInfoResponse(
	String id,
	String login,
	@JsonProperty("avatar_url") String avatarUrl
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
