package com.CarRental.dto;

import com.CarRental.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private long id;
    private String name;
    private String email;
    private UserRole userRole;
}
