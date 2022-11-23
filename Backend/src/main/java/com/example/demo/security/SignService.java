package com.example.demo.security;

import com.example.demo.mapper.TestMapper;
import com.example.demo.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SignService {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;
    @Transactional
    public UserDto registerMember(UserDto requestDto) {
        //validateDuplicated(requestDto.getEmail());
        UserDto user=requestDto;
        user.setPassword(new BCryptPasswordEncoder().encode(requestDto.getPassword()));
        if(userMapper.searchByEmail(requestDto.getEmail())==null)
            userMapper.registUser(user);
        else{

        }
        /*Member user = memberRepository.save(
                Member.builder()
                        .email(requestDto.getEmail())
                        .password(new BCryptPasswordEncoder().encode(requestDto.getPassword()))
                        .build());
         */
        requestDto.setPassword("*****");
        System.out.println("test:"+user);
        return requestDto;
        //return new MemberDto(user.getId(), user.getEmail());
    }

    /**
     * Unique한 값을 가져야하나, 중복된 값을 가질 경우를 검증
     * @param email
//     */
//    public void validateDuplicated(String email) {
//        if (memberRepository.findByEmail(email).isPresent());
//            //throw new MemberEmailAlreadyExistsException();
//    }

    public UserApiDto loginMember(UserApiDto requestDto) throws Exception {
        //Member user = memberRepository.findByEmail(requestDto.getEmail()).orElseThrow(Exception::new);
        UserDto user = userMapper.searchByEmail(requestDto.getEmail());
        if(user!=null) {
            if (!new BCryptPasswordEncoder().matches(requestDto.getPassword(), user.getPassword())) ;
            //throw new LoginFailureException();
            return new UserApiDto(user.getEmail(), jwtTokenProvider.createToken(requestDto.getEmail()));
        }
        else{
            return new UserApiDto();
        }

    }
}