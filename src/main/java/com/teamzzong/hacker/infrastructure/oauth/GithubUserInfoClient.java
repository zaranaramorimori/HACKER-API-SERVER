package com.teamzzong.hacker.infrastructure.oauth;

import java.util.List;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.teamzzong.hacker.config.GithubOauthProperty;
import com.teamzzong.hacker.dto.UserInfo;
import com.teamzzong.hacker.dto.oauth.GithubUserInfoResponse;

public class GithubUserInfoClient {

	private final GithubOauthProperty property;
	private final RestTemplate restTemplate;

	public GithubUserInfoClient(GithubOauthProperty property, RestTemplateBuilder restTemplateBuilder) {
		this.property = property;
		this.restTemplate = restTemplateBuilder
			.errorHandler(new GithubExceptionHandler())
			.build();
	}

	public UserInfo request(String accessToken) {
		HttpHeaders headers = getHttpHeaders(accessToken);

		GithubUserInfoResponse response = restTemplate
			.exchange(
				property.userInfoUri(),
				HttpMethod.GET,
				new HttpEntity<>(headers),
				GithubUserInfoResponse.class
			)
			.getBody();

		return response.toUserInfo();
	}

	private HttpHeaders getHttpHeaders(String accessToken) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(accessToken);
		headers.setAccept(List.of(MediaType.APPLICATION_JSON));
		return headers;
	}
}
