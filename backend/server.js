require('dotenv').config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 2. Use the exact model name found in your terminal list
const TARGET_MODEL = "gemini-2.5-flash-lite";

// 3. Corrected URL structure
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/${TARGET_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

async function generateResponse(userInput, userFilters) {
  const fullPrompt = userFilters
    ? `User Request: ${userInput}\nPreferences: ${userFilters}`
    : userInput;

  const payload = {
    contents: [{ parts: [{ text: fullPrompt }] }],
  };

  try {
    const response = await axios.post(GEMINI_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "I couldn't find any hotels matching that. Try a different location!";
    }
  } catch (err) {
    if (err.response) {
      console.log(`--- API ERROR (${err.response.status}) ---`);
      console.log(err.response.data);
      return "The AI server is having trouble. Check terminal for details.";
    }
    console.log(`Local Error: ${err.message}`);
    return "Something went wrong on the server.";
  }
}

app.post("/chat", async (req, res) => {
  const { message = "", filter = "" } = req.body;
  const reply = await generateResponse(message, filter);
  res.json({ response: reply });
});

const PORT =  process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
