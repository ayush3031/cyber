package com.cybersec.phishing.checker.controller;

import com.cybersec.phishing.checker.model.EmailModel;
import com.cybersec.phishing.checker.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
    private EmailService emailService;
    @PostMapping(value = "/api/check-email")
    public ResponseEntity<String> emailControl(EmailModel emailModel)
    {
        String response=emailService.handleEmailResponse(emailModel.getEmailModel());

        return ResponseEntity.ok("Message "+response);
    }
}
