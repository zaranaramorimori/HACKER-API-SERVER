package com.teamzzong.hacker.infrastructure.oauth;

import java.io.IOException;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.DefaultResponseErrorHandler;

public class GithubUserInfoExceptionHandler extends DefaultResponseErrorHandler {

	@Override
	public void handleError(ClientHttpResponse response) throws IOException {
		HttpStatusCode statusCode = response.getStatusCode();
		if (statusCode.is4xxClientError()) {
			throw new IllegalArgumentException(); // TODO
		}
		if (statusCode.is5xxServerError()) {
			throw new IllegalArgumentException("[Github] Internal Server Error"); // TODO
		}
	}
}
