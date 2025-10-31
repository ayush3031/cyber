package com.cybersec.phishing.checker.controller;

import com.cybersec.phishing.checker.model.EmailModel;
import com.cybersec.phishing.checker.service.EmailService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "https://phishing-checker.vercel.app/")
public class EmailController {


    @Autowired
    private EmailService emailService;
    @Autowired
    private ObjectMapper objectMapper;


    @PostMapping(value = "/api/checkemail")
    public ResponseEntity<?> emailControl(@Validated @RequestBody EmailModel emailModel) throws JsonProcessingException {
        System.out.println("helloooo");
        String response =emailService.handleEmailResponse(emailModel.getEmailModel());
        Map<String, Object> body = objectMapper.readValue(response, new TypeReference<>() {});
        System.out.println(body);
        return ResponseEntity.ok(body);
    }
}
