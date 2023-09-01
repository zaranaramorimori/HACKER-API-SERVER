package com.teamzzong.hacker.dto;

import com.teamzzong.hacker.domain.AuthTokens;

public record SignUpResponse(
	String accessToken,
	String refreshToken
) {

	public static SignUpResponse from(AuthTokens authTokens) {
		return new SignUpResponse(
			authTokens.getAccessToken(),
			authTokens.getRefreshToken()
		);
	}
}
