package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BookDto {
    private String ISBN;
    private String title;
    private String author;
    private String index;
    private String cover;
    private String story;
    private Date publish_date;
    private String genre;
    private String type;
    private String position;
    private int number_of_reviews;
    private int number_of_rental;
    private String content;


}