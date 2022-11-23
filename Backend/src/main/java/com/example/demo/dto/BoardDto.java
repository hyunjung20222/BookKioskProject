package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardDto {
    private int board_id;
    private String id;
    private String title;
    private String story;
    private String type;
    private Date created_date;

}