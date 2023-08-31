package com.teamzzong.hacker.infrastructure.jwt;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;

import com.teamzzong.hacker.domain.AuthTokenType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@ConfigurationProperties(prefix = "auth")
@AllArgsConstructor
@Getter
public class JwtAuthProperty {

	private final Map<AuthTokenType, Integer> expirationMinute;
	private final Map<AuthTokenType, String> secretKey;
}
