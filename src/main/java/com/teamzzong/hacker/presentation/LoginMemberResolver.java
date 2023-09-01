package com.teamzzong.hacker.presentation;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.teamzzong.hacker.application.AuthTokenProvider;
import com.teamzzong.hacker.domain.AuthTokenPayload;
import com.teamzzong.hacker.domain.AuthTokenType;
import com.teamzzong.hacker.dto.LoginMember;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class LoginMemberResolver implements HandlerMethodArgumentResolver {

	private static final String BEARER_TOKEN_PREFIX = "Bearer ";

	private final AuthTokenProvider authTokenProvider;

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().equals(LoginMember.class) && parameter.hasParameterAnnotation(Login.class);
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
		NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
		String header = webRequest.getHeader(HttpHeaders.AUTHORIZATION);
		String token = extractToken(header);
		AuthTokenPayload payload = authTokenProvider.extract(AuthTokenType.ACCESS, token);
		return new LoginMember(payload.memberId());
	}

	private String extractToken(String header) {
		validateHeader(header);
		return header.substring(BEARER_TOKEN_PREFIX.length()).trim();
	}

	private void validateHeader(String header) {
		if (header == null) {
			throw new IllegalArgumentException("토큰이 없습니다."); // TODO
		}
		if (!header.toLowerCase().startsWith(BEARER_TOKEN_PREFIX.toLowerCase())) {
			throw new IllegalArgumentException("Bearer Type의 토큰이 아닙니다."); // TODO
		}
	}
}
