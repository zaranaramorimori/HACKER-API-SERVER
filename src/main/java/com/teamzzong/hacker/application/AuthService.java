package com.teamzzong.hacker.application;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teamzzong.hacker.application.oauth.OauthClients;
import com.teamzzong.hacker.domain.AuthTokenPayload;
import com.teamzzong.hacker.domain.AuthTokenType;
import com.teamzzong.hacker.domain.AuthTokens;
import com.teamzzong.hacker.domain.Member;
import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.LoginResponse;
import com.teamzzong.hacker.dto.SignUpRequest;
import com.teamzzong.hacker.dto.SignUpResponse;
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
		return LoginResponse.login(createAuthToken(member));
	}

	private AuthTokens createAuthToken(Member member) {
		AuthTokenPayload payload = new AuthTokenPayload(member.getId());
		String accessToken = tokenProvider.generate(AuthTokenType.ACCESS, payload);
		String refreshToken = tokenProvider.generate(AuthTokenType.REFRESH, payload);
		return new AuthTokens(accessToken, refreshToken);
	}

	public SignUpResponse signUp(SignUpRequest request) {
		validateExistMember(request.socialType(), request.socialId());
		validateNickname(request.nickname());
		Member member = memberRepository.save(new Member(request.socialType(), request.socialId(), request.nickname()));
		return SignUpResponse.from(createAuthToken(member));
	}

	private void validateExistMember(SocialType socialType, String socialId) {
		memberRepository.findBySocialTypeAndSocialId(socialType, socialId)
			.ifPresent(member -> {
				throw new IllegalArgumentException("이미 존재하는 회원입니다.");
			});
	}

	private void validateNickname(String nickname) {
		memberRepository.findByNickname(nickname)
			.ifPresent(member -> {
				throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
			});
	}
}
