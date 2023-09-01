package com.teamzzong.hacker.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth2.github")
public record GithubOauthProperty(
	String clientId,
	String clientSecret,
	String redirectUri,
	String tokenUri,
	String userInfoUri
) {

}
