package com.cybersec.phishing.checker.controller;

import com.cybersec.phishing.checker.model.EmailModel;
import com.cybersec.phishing.checker.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class EmailController {
    @Autowired
    private EmailService emailService;
    @PostMapping(value = "/api/checkemail")
    public ResponseEntity<String> emailControl(@Validated @RequestBody EmailModel emailModel)
    {
        System.out.println("helloooo");
        String response=emailService.handleEmailResponse(emailModel.getEmailModel());

        return ResponseEntity.ok("Message "+response);
    }
}
