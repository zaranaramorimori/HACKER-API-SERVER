package com.teamzzong.hacker.dto.oauth;

public record GithubTokenResponse(
	String accessToken,
	String scope,
	String tokenType
) {
}
