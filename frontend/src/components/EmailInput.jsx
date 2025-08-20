import React from 'react'
import { Textarea } from '@mantine/core';
import '../styles/emailInput.css'


function EmailInput() {
  return (
    <div className='email-input-container'>
        <Textarea
        placeholder="Autosize with no rows limit"
        label="Paste the mail you want to check..."
        autosize
        minRows={2}
        maxRows={10}
      />
    </div>
  )
}

export default EmailInput