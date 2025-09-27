import React, { useState } from 'react'
import { JsonInput, Textarea , Text} from '@mantine/core';
import '../styles/emailInput.css'
import { Button } from '@mantine/core';
import axios from "axios";
import { Response } from './Response';
import AppLoader from './AppLoader';

const API_URL = import.meta.env.VITE_API_URL;
function EmailInput() {
  const [emailContent, setEmailContent] = useState("");
  const [result,setResult]=useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    setLoading(true); 
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
    finally{
      setLoading(false);
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
        {loading && <AppLoader />}
        {!loading && result && <Response data={result} />}
      </div>
    </section>
  )
}

export default EmailInput