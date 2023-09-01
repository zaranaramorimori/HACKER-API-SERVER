package com.teamzzong.hacker.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class AuthTokens {

	private final String accessToken;
	private final String refreshToken;
}
