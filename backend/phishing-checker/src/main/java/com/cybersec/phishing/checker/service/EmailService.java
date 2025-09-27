package com.cybersec.phishing.checker.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${GEMINI_API_KEY:}") // default empty if not set
    private String apiKey;

    private Client client;

    @PostConstruct
    public void init() {
        if (apiKey == null || apiKey.isEmpty()) {
            System.err.println("WARNING: GEMINI_API_KEY is not set. EmailService will not function properly.");
            client = null; // client not initialized, but bean is created safely
        } else {
            try {
                client = Client.builder().apiKey(apiKey).build();
                System.out.println("Gemini client initialized successfully.");
            } catch (Exception e) {
                System.err.println("Failed to initialize Gemini client: " + e.getMessage());
                client = null;
            }
        }
    }

    public String analyzeEmail(String request) {
        if (client == null) {
            return "Error: GEMINI_API_KEY is missing or invalid. Cannot analyze email.";
        }

        try {
            String prompt = "You are a highly skilled AI Cybersecurity Analyst named 'PhishGuard'. Your primary mission is to analyze email content for signs of phishing, scams, or other malicious intent and return a structured JSON analysis.\n" +
                    "When you receive email content, you must perform the following analysis:\n"+
                    " 1.  **Sender Analysis:** Examine the sender's display name and email address. Scrutinize the domain for impersonation tactics (e.g., typosquatting, non-standard TLDs, subdomain tricks).\n"+
                    "2.  **Subject Line Analysis:** Evaluate the subject for signs of urgency, threat, or unusual capitalization and formatting.\n"+
                    "3.  **Content Analysis:** Read the email body carefully. Check for poor grammar, spelling mistakes, generic greetings (e.g.,'Dear Valued Customer'), and an emotional or threatening tone.\n"+
                    "4.  **Call-to-Action (CTA) Analysis:** Identify all links, buttons, and attachments. Assess the purpose of the CTA. Is it trying to harvest credentials, create panic, or install malware? \n"+
                    "5.  **Contextual Logic:** Determine if the email makes logical sense. Is it an expected communication? Differentiate between an email that *is* a phishing attempt and a legitimate security alert *about* a potential threat. \n"+

                    "Based on your analysis, you must generate a response formatted as a single, raw JSON object. Do not include any explanatory text, markdown formatting, or any characters before or after the JSON object. The JSON object must have the following keys. For all string values, keep the response concise and under 30 words. For arrays like red_flags and green_flags, this limit applies to each individual string element in the array.: \n"+

                    " - `suspicion_level`: A string containing a percentage (0%-100%) and a qualitative label (e.g., 'Minimal', 'Low', 'Medium', 'High', or 'Critical'). \n"+
                    " - `reason_of_suspicion`: A string containing the single most compelling factor that determined your assessment. \n"+
                    " - `red_flags`: An array of strings, where each string is a suspicious element you identified. **If no red flags are found, this array must contain a single string: 'No red flags identified.'** \n"+
                    "- `recommended_action`: A string containing a clear, safe, step-by-step recommendation for the user. Prioritize user safety and always advise independent verification if there is any doubt. \n"+

                    "Your final output must be only the JSON object. \n Here is the email you have to check \n"
                    + request;
            GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", prompt, null);
            return response.text();
        } catch (Exception e) {
            return "Error while analyzing email: " + e.getMessage();
        }
    }

    public String handleEmailResponse(String emailContent) {
        String response = analyzeEmail(emailContent);
        System.out.println(response);
        return response;
    }
}




/*package com.cybersec.phishing.checker.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private Client client;

    public EmailService(@Value("${GEMINI_API_KEY}") String apiKey) {
        System.out.println(apiKey);
        if(apiKey==null)
        {
            System.out.println("No api key");
        }
        this.client = Client.builder().apiKey(apiKey).build();
    }

    public String analyzeEmail(String request ) {
        try {
            /*String prompt = "Analyze the following email and return a suspicion level (Low, Medium, High) "
                    + "if the email looks like fraud/phishing:\n\n"
                    + request.getEmailModel();
            String prompt = "how does ai work explain in few words?";
            GenerateContentResponse response = client.models .generateContent("gemini-2.5-flash", prompt, null);
            return response.text(); } catch (Exception e) { return "Error while analyzing email: " + e.getMessage();
        }
    }
    public String handleEmailResponse(String emailContent)
    {
        String response = analyzeEmail(emailContent);
        System.out.println(response);
        return response;
    }
}
*/