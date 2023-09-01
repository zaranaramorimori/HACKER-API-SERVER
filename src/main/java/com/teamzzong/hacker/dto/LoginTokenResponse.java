package com.teamzzong.hacker.dto;

public record LoginTokenResponse(
	String accessToken,
	String refreshToken
) {
}
