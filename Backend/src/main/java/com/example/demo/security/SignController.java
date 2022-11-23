package com.example.demo.security;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class SignController {

    private final SignService signService;
    //private final ResponseService responseService;

    @PostMapping("/signUp")
    public UserDto register(@RequestBody UserDto requestDto) {
        System.out.println("signUp");
        UserDto responseDto = signService.registerMember(requestDto);
        return responseDto;
    }

    @PostMapping("/login")
    public UserApiDto login(@RequestBody UserApiDto requestDto) throws Exception {
        UserApiDto responseDto = signService.loginMember(requestDto);
        return responseDto;
    }
}