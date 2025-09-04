import React, { useState } from 'react'
import { JsonInput, Textarea , Text} from '@mantine/core';
import '../styles/emailInput.css'
import { Button } from '@mantine/core';
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;
function EmailInput() {
  const [emailContent, setEmailContent] = useState("");
  const [result,setResult]=useState("");

  const handleSubmit = async () => {
    console.log("submit button");
    try {
      console.log(emailContent);
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/api/checkemail`, {
        emailContent: emailContent},
        {
    headers: {
      "Content-Type": "application/json",
    },
  }); 
      console.log("response button");
      console.log(response.data);
      setResult(response.data); // expecting "Suspicious" / "Fraud" / "Okay"
    } catch (error) {
      setResult("Error analyzing email");
    }
  };

  return (
    <section id='paste-mail'>
      <div className='input-container'>
        <div className='email-input-container'>
          <Textarea
          placeholder="Paste suspicious email text here..."
          label="Got a suspicious email? Paste it here and let us analyze it."
          autosize
          minRows={10}
          maxRows={10}
          value={emailContent}
          onChange={(e) => setEmailContent(e.currentTarget.value)}
        />
        </div>
        <Button 
          className='submit-button'
          size="xl"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          onClick={handleSubmit}
          mt="md"
        >
        Submit
        </Button>
        {result && (
          <div>
            <h2>Phishing Analysis</h2>
            <p><strong>Suspicion Level:</strong> {result.suspicion_level}</p>
            <p><strong>Reason:</strong> {result.reason_of_suspicion}</p>

            <h3>Red Flags:</h3>
            <ul>
              {result.red_flags.map((flag, index) => (
                <li key={index}>{flag}</li>
              ))}
            </ul>

            <h3>Green Flags:</h3>
            <ul>
              {result.green_flags.map((flag, index) => (
                <li key={index}>{flag}</li>
              ))}
            </ul>

            <p><strong>Recommended Action:</strong> {result.recommended_action}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default EmailInput