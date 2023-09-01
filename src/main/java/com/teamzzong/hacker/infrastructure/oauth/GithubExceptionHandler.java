package com.teamzzong.hacker.infrastructure.oauth;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.DefaultResponseErrorHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GithubExceptionHandler extends DefaultResponseErrorHandler {

	@Override
	public void handleError(ClientHttpResponse response) throws IOException {
		HttpStatusCode statusCode = response.getStatusCode();
		if (statusCode.is4xxClientError()) {
			log4xxError(response);
			// throw new IllegalArgumentException(); // TODO
		}
		if (statusCode.is5xxServerError()) {
			throw new IllegalArgumentException("[Github] Internal Server Error"); // TODO
		}
	}

	private void log4xxError(ClientHttpResponse response) throws IOException {
		log.warn("[{}] {}",
			response.getStatusText(),
			new String(getResponseBody(response), StandardCharsets.UTF_8));
	}
}
