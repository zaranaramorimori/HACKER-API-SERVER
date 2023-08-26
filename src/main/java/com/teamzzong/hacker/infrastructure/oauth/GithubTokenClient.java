package com.teamzzong.hacker.infrastructure.oauth;

import java.util.List;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.teamzzong.hacker.dto.oauth.GithubTokenResponse;

public class GithubTokenClient {

	private final GithubOauthProperty property;
	private final RestTemplate restTemplate;

	public GithubTokenClient(GithubOauthProperty property, RestTemplateBuilder restTemplateBuilder) {
		this.property = property;
		this.restTemplate = restTemplateBuilder
			.errorHandler(new GithubTokenExceptionHandler())
			.build();
	}

	public String request(String code) {
		String uri = getRequestUri(code);
		HttpHeaders header = getRequestHeader();
		GithubTokenResponse response = restTemplate
			.postForEntity(
				uri,
				new HttpEntity<>(header),
				GithubTokenResponse.class
			)
			.getBody();

		return response.accessToken();
	}

	private String getRequestUri(String code) {
		return UriComponentsBuilder.fromUriString(property.tokenUri())
			.queryParam("client_id", property.clientId())
			.queryParam("client_secret", property.clientSecret())
			.queryParam("code", code)
			.toUriString();
	}

	private HttpHeaders getRequestHeader() {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(List.of(MediaType.APPLICATION_JSON));
		return headers;
	}
}
