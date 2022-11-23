package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardAnswerDto {
    private int board_answer_id;
    private int id;
    private int board_id;
    private String story;
    private Date created_date;

}