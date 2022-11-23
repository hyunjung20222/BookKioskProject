package com.example.demo.controller;

import com.example.demo.dto.BoardDto;
import com.example.demo.dto.BookDto;
import com.example.demo.dto.UsageDto;
import com.example.demo.service.BoardService;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    //모든 공지사항 글
    @RequestMapping(value = "/noticeAll", method = RequestMethod.GET)
    public List<BoardDto> noticeAll() {
        return boardService.noticeAll();
    }

    //json {"title":"제목","story":"내용","answers":[{"story":"내용","id":"작성자id"},{"story":"내용2","id":"작성자id2"},..]}
    @RequestMapping(value = "/noticeDetail", method = RequestMethod.GET)
    public BoardDto noticeDetail(@RequestParam("boardId") int boardId) {
        return boardService.noticeDetail(boardId);
    }

    //공지사항 작성(로그인 및 관리자인지 검사 필요)
    @RequestMapping(value = "/notice", method = RequestMethod.PUT)
    public String noticeWrite(@RequestBody BoardDto dto) {
        return boardService.noticeWrite(dto);
    }

    //공지사항 삭제(로그인 및 관리자인지 검사 필요)
    @RequestMapping(value = "/notice", method = RequestMethod.DELETE)
    public String noticeDelete(@RequestParam("boardId") int boardId) {
        return boardService.noticeDelete(boardId);
    }

}
