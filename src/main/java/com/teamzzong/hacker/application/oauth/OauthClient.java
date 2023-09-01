package com.teamzzong.hacker.application.oauth;

import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.UserInfo;

public interface OauthClient {

	SocialType socialType();

	String requestAccessToken(String code);

	UserInfo requestUserInfo(String accessToken);
}
