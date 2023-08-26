package com.teamzzong.hacker.dto.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GithubTokenResponse(
	@JsonProperty("access_token") String accessToken,
	String scope,
	@JsonProperty("token_type") String tokenType
) {
}
