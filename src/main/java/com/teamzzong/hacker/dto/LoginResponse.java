package com.teamzzong.hacker.dto;

import com.teamzzong.hacker.domain.AuthTokens;

public record LoginResponse(
	Boolean isNew,
	LoginTokenResponse tokens,
	LoginUserInfoResponse userInfo
) {

	public static LoginResponse login(AuthTokens authTokens) {
		return new LoginResponse(
			false,
			new LoginTokenResponse(authTokens.getAccessToken(), authTokens.getRefreshToken()),
			null
		);
	}

	public static LoginResponse signUp(UserInfo userInfo) {
		return new LoginResponse(
			true,
			null,
			LoginUserInfoResponse.from(userInfo)
		);
	}
}
