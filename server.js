import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your_api_key_here';
const TARGET_MODEL = 'gemini-2.5-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/${TARGET_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

app.use(cors());
app.use(express.json());

async function generateResponse(userInput, userFilters = null) {
  const fullPrompt = userFilters
    ? `User Request: ${userInput}\nPreferences: ${userFilters}`
    : userInput;

  const payload = {
    contents: [{ parts: [{ text: fullPrompt }] }],
  };

  try {
    const response = await axios.post(GEMINI_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = response.data;
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    return "I couldn't find any hotels matching that. Try a different location!";
  } catch (err) {
    const status = err.response?.status;
    console.error(`Gemini API error (${status}):`, err.response?.data || err.message);
    return 'The AI server is having trouble. Check the terminal for details.';
  }
}

app.post('/chat', async (req, res) => {
  const { message = '', filter = '' } = req.body;
  const reply = await generateResponse(message, filter);
  res.json({ response: reply });
});

app.listen(PORT, () => {
  console.log(`Hotel Buddy server running on http://localhost:${PORT}`);
});
