package com.teamzzong.hacker.dto;

public record LoginResponse(
	Boolean isNew,
	LoginTokenResponse tokens,
	LoginUserInfoResponse userInfo
) {

	public static LoginResponse login(String accessToken, String refreshToken) {
		return new LoginResponse(
			false,
			new LoginTokenResponse(accessToken, refreshToken),
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
