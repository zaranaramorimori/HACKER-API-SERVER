package com.teamzzong.hacker.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.teamzzong.hacker.presentation.LoginMemberResolver;

@Configuration
public class LoginConfig implements WebMvcConfigurer {

	private final LoginMemberResolver loginMemberResolver;

	public LoginConfig(LoginMemberResolver loginMemberResolver) {
		this.loginMemberResolver = loginMemberResolver;
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(loginMemberResolver);
	}
}
