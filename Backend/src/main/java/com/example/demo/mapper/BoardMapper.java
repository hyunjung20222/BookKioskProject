package com.example.demo.mapper;

import com.example.demo.dto.BoardDto;
import com.example.demo.dto.BookDto;
import com.example.demo.dto.UsageDto;
import com.example.demo.service.BoardService;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardMapper {

    List<BoardDto> noticeAll();
    int noticeWrite(BoardDto dto);

    String searchIdfromBoardId(int boardId);

    int noticeDelete(int boardId);

    BoardDto noticeDetail(int noticeId);
}