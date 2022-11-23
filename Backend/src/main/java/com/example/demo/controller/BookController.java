package com.example.demo.controller;

import com.example.demo.dto.BookDto;
import com.example.demo.dto.UsageDto;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {
    private final BookService bookService;
    @RequestMapping(value = "/borrow", method = RequestMethod.PUT)
    public List<UsageDto> borrow(@RequestParam("ISBN") List<String> isbns) {
        return bookService.borrow(isbns);
    }
    @RequestMapping(value = "/return", method = RequestMethod.PUT)
    public List<String> return_book(@RequestParam("ISBN") List<String> isbns) {
        return bookService.return_book(isbns);
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public List<BookDto> search(@RequestParam("keyword") String keyword) {
        return bookService.search(keyword);
    }

}
