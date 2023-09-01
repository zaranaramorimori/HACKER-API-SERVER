package com.teamzzong.hacker.dto;

public record SignUpResponse(
	String accessToken,
	String refreshToken
) {
}
