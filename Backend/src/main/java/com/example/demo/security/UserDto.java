package com.example.demo.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class UserDto{
    private String password;
    private String phonenumber;
    private String email;
    private String address;
    private String manager_bool;
    private String name;
    private String gender;
    private String birthday;


}
