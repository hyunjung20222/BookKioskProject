package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UsageDto {
    private String id;
    private String ISBN;
    private Date rental_date;
    private Date reservation;
    private Date return_date;
    private String overdue;
    private String late_fee;

}
