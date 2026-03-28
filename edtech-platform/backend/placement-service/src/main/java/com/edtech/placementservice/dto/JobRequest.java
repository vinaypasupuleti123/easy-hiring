package com.edtech.placementservice.dto;

import jakarta.validation.constraints.NotBlank;

public class JobRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String company;
    private String description;
    private String salary;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }
}
