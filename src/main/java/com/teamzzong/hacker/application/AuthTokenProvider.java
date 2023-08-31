package com.teamzzong.hacker.application;

import com.teamzzong.hacker.domain.AuthTokenPayload;
import com.teamzzong.hacker.domain.AuthTokenType;

public interface AuthTokenProvider {

	String generate(AuthTokenType type, AuthTokenPayload payload);

	AuthTokenPayload extract(AuthTokenType type, String token);
}
