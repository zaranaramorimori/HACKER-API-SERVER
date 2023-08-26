package com.teamzzong.hacker.infrastructure.oauth;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;

import com.teamzzong.hacker.application.oauth.OauthClient;
import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.UserInfo;

@Component
public class GithubOauthClient implements OauthClient {

	private final GithubOauthProperty property;
	private final GithubTokenClient tokenClient;
	private final GithubUserInfoClient userInfoClient;

	public GithubOauthClient(GithubOauthProperty property, RestTemplateBuilder restTemplateBuilder) {
		this.property = property;
		this.tokenClient = new GithubTokenClient(property, restTemplateBuilder);
		this.userInfoClient = new GithubUserInfoClient(property, restTemplateBuilder);
	}

	@Override
	public SocialType socialType() {
		return SocialType.GITHUB;
	}

	@Override
	public String requestAccessToken(String code) {
		return tokenClient.request(code);
	}

	@Override
	public UserInfo requestUserInfo(String accessToken) {
		return userInfoClient.request(accessToken);
	}
}
