package com.teamzzong.hacker.config;

import java.util.Set;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.teamzzong.hacker.application.oauth.OauthClient;
import com.teamzzong.hacker.application.oauth.OauthClients;

@Configuration
@EnableConfigurationProperties({GithubOauthProperty.class})
public class OauthConfig {

	@Bean
	public OauthClients oAuth2Clients(Set<OauthClient> clients) {
		return new OauthClients(clients);
	}
}
