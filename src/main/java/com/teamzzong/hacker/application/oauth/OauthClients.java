package com.teamzzong.hacker.application.oauth;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.UserInfo;

public class OauthClients {

	private final Map<SocialType, OauthClient> clients;

	public OauthClients(Set<OauthClient> clients) {
		this.clients = clients.stream()
			.collect(Collectors.toMap(OauthClient::socialType, oauthClient -> oauthClient));
	}

	public UserInfo requestUserInfo(SocialType socialType, String code) {
		OauthClient oauthClient = clients.get(socialType);
		if (oauthClient == null) {
			throw new IllegalArgumentException("올바르지 않은 SocialType 입니다.");
		}
		String accessToken = oauthClient.requestAccessToken(code);
		return oauthClient.requestUserInfo(accessToken);
	}

}
