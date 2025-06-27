const cron = require('node-cron');
const fetch = require('node-fetch'); // Using node-fetch for making HTTP requests

// Schedule a daily email digest at a specific time (e.g., 8:00 AM daily)
cron.schedule('0 8 * * *', async () => {
  console.log('Running daily email digest task...');
  try {
    const response = await fetch('http://localhost:3000/api/send-digest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Email digest sent successfully!');
    } else {
      const errorData = await response.json();
      console.error('Failed to send email digest:', errorData);
    }
  } catch (error) {
    console.error('Error sending email digest:', error);
  }
});

console.log('Cron scheduler started. Daily email digest scheduled for 8:00 AM.');
