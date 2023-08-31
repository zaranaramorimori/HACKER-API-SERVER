package com.teamzzong.hacker.infrastructure.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import com.teamzzong.hacker.application.AuthTokenProvider;
import com.teamzzong.hacker.config.JwtAuthProperty;
import com.teamzzong.hacker.domain.AuthTokenPayload;
import com.teamzzong.hacker.domain.AuthTokenType;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtAuthTokenProvider implements AuthTokenProvider {

	private static final int SECOND_FACTOR = 60;
	private static final int MILLISECOND_FACTOR = 1000;
	private static final String MEMBER_ID_KEY = "id";

	private final Map<AuthTokenType, SecretKey> secretKeys;
	private final Map<AuthTokenType, Integer> expirationMinutes;

	private JwtAuthTokenProvider(Map<AuthTokenType, SecretKey> secretKeys,
		Map<AuthTokenType, Integer> expirationMinutes) {
		this.secretKeys = secretKeys;
		this.expirationMinutes = expirationMinutes;
	}

	public static JwtAuthTokenProvider from(JwtAuthProperty property) {
		Map<AuthTokenType, SecretKey> secretKeys = property.getSecretKey()
			.entrySet()
			.stream()
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				entry -> Keys.hmacShaKeyFor(entry.getValue().getBytes(StandardCharsets.UTF_8))
			));
		return new JwtAuthTokenProvider(secretKeys, property.getExpirationMinute());
	}

	@Override
	public String generate(AuthTokenType type, AuthTokenPayload payload) {
		Integer expMinutes = expirationMinutes.get(type);
		SecretKey secretKey = secretKeys.get(type);
		if (expMinutes == null || secretKey == null) {
			throw new IllegalArgumentException(); // TODO
		}
		Date now = new Date();
		Date expiration = new Date(now.getTime() + expMinutes * SECOND_FACTOR * MILLISECOND_FACTOR);
		return Jwts.builder()
			.claim(MEMBER_ID_KEY, payload.memberId())
			.setIssuedAt(now)
			.setExpiration(expiration)
			.signWith(secretKey, SignatureAlgorithm.HS256)
			.compact();
	}

	@Override
	public AuthTokenPayload extract(AuthTokenType type, String token) {
		SecretKey secretKey = secretKeys.get(type);
		if (secretKey == null) {
			throw new IllegalArgumentException(); // TODO
		}
		Claims claims = getClaims(secretKey, token);
		Long memberId = claims.get(MEMBER_ID_KEY, Long.class);
		return new AuthTokenPayload(memberId);
	}

	private Claims getClaims(SecretKey secretKey, String code) {
		try {
			return Jwts.parserBuilder()
				.setSigningKey(secretKey)
				.build()
				.parseClaimsJws(code)
				.getBody();
		} catch (ExpiredJwtException e) {
			throw new IllegalArgumentException("토큰 만료"); // TODO
		} catch (JwtException | IllegalArgumentException e) {
			throw new IllegalArgumentException("토큰 유효 X"); // TODO
		}
	}
}
