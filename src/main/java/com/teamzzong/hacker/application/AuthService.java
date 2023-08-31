package com.teamzzong.hacker.application;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teamzzong.hacker.application.oauth.OauthClients;
import com.teamzzong.hacker.domain.AuthTokenPayload;
import com.teamzzong.hacker.domain.AuthTokenType;
import com.teamzzong.hacker.domain.Member;
import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.LoginResponse;
import com.teamzzong.hacker.dto.UserInfo;
import com.teamzzong.hacker.infrastructure.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

	private final OauthClients oauthClients;
	private final MemberRepository memberRepository;
	private final AuthTokenProvider tokenProvider;

	public LoginResponse login(SocialType socialType, String code) {
		UserInfo userInfo = oauthClients.requestUserInfo(socialType, code);
		Optional<Member> optionalMember = memberRepository.findBySocialTypeAndSocialId(socialType, userInfo.socialId());
		if (optionalMember.isEmpty()) {
			return LoginResponse.signUp(userInfo);
		}
		Member member = optionalMember.get();
		AuthTokenPayload payload = new AuthTokenPayload(member.getId());
		String accessToken = tokenProvider.generate(AuthTokenType.ACCESS, payload);
		String refreshToken = tokenProvider.generate(AuthTokenType.REFRESH, payload);
		return LoginResponse.login(accessToken, refreshToken);
	}
}
