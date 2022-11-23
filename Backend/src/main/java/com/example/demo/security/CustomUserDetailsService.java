package com.example.demo.security;

import com.example.demo.mapper.TestMapper;
import com.example.demo.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    //private final UsersRepository usersRepository;
    private final UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userMapper.searchByEmail(username);
        List<GrantedAuthority> authorites = new ArrayList<GrantedAuthority>();
//        if(user!=null){
//            authorities.add(new SimpleGrantedAuthority(UserDto.getUserRole());
//            UserDto.setAuthorities(authorities);
//        }
        User user2 = new User(user.getEmail(), user.getPassword(), authorites);
        return user2;
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
//    private UserDetails createUserDetails(Users users) {
//        return new User(users.getUsername(), users.getPassword(), users.getAuthorities());
//    }
}