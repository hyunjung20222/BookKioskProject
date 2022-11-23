package com.example.demo.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserApiDto {
    private String password;
    private String email;
    private String token;
    public UserApiDto(){

    }

    public UserApiDto(String id, String password, String email) {
        this.password= password;
        this.email=email;

    }
    public UserApiDto(String email, String token) {
        this.email= email;
        this.token=token;

    }
}
