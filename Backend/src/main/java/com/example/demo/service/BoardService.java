package com.example.demo.service;

import com.example.demo.dto.BoardDto;
import com.example.demo.dto.BookDto;
import com.example.demo.dto.UsageDto;
import com.example.demo.mapper.BoardMapper;
import com.example.demo.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardMapper boardMapper;

    public List<BoardDto> noticeAll() {
        return boardMapper.noticeAll();
    }

    public String noticeWrite(BoardDto dto) {
        String id=SecurityContextHolder.getContext().getAuthentication().getName();
        Date date = new Date();
        dto.setId(id);
        dto.setCreated_date(date);
        dto.setType("notice");
        if(boardMapper.noticeWrite(dto)==1)
            return "success";
        else
            return "fail";
    }
    public BoardDto noticeDetail(int noticeId) {
        return boardMapper.noticeDetail(noticeId);
    }
    public String noticeDelete(int noticeId) {
        String id=SecurityContextHolder.getContext().getAuthentication().getName();
        if(id.equals(boardMapper.searchIdfromBoardId(noticeId))){
             boardMapper.noticeDelete(noticeId);
            return "success";
        }
        return "fail";
    }
}
