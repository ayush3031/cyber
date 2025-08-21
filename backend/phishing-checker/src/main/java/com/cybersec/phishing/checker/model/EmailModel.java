package com.cybersec.phishing.checker.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailModel {
    @NotBlank(message = "Email should not be blank")
    private String emailContent;
    public EmailModel()
    {
    }
    public EmailModel(String emailContent)
    {
        this.emailContent=emailContent;
    }
    public String getEmailModel() {
        return this.emailContent;
    }
}
