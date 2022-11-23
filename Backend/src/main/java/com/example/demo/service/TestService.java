package com.example.demo.service;

import com.example.demo.dto.BookDto;
import com.example.demo.dto.TestDto;

import java.util.List;

public interface TestService {

    public List<TestDto> getUserList();
    public String insertBookApiData();
}