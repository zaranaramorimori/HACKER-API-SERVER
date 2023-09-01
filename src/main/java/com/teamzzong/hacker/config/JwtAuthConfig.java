package com.teamzzong.hacker.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.teamzzong.hacker.application.AuthTokenProvider;
import com.teamzzong.hacker.infrastructure.jwt.JwtAuthTokenProvider;

import lombok.AllArgsConstructor;

@Configuration
@EnableConfigurationProperties(JwtAuthProperty.class)
@AllArgsConstructor
public class JwtAuthConfig {

	private final JwtAuthProperty property;

	@Bean
	public AuthTokenProvider authTokenProvider() {
		return JwtAuthTokenProvider.from(property);
	}
}
