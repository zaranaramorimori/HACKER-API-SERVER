package com.teamzzong.hacker.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamzzong.hacker.application.AuthService;
import com.teamzzong.hacker.domain.SocialType;
import com.teamzzong.hacker.dto.LoginResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login/{socialType}/{code}")
	public ResponseEntity<LoginResponse> login(@PathVariable SocialType socialType, @PathVariable String code) {
		LoginResponse login = authService.login(socialType, code);
		return ResponseEntity.ok(login);
	}
}
