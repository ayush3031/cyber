import React, { useState } from 'react'
import { Textarea } from '@mantine/core';
import '../styles/emailInput.css'
import { Button } from '@mantine/core';


function EmailInput() {
  const [emailText, setEmailText] = useState("");
  const [result,setResult]=useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/check-email`, {
        text: emailText,
      });
      setResult(response.data.result); // expecting "Suspicious" / "Fraud" / "Okay"
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
          value={emailText}
          onChange={(e) => setEmailText(e.currentTarget.value)}
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
          <Text mt="md" fw={700} size="lg">
            Result: {result}
          </Text>
        )}
      </div>
    </section>
  )
}

export default EmailInput