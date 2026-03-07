const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TARGET_MODEL = "gemini-2.5-flash-lite";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/${TARGET_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are Hotel Buddy, an AI hotel booking assistant. You ONLY answer questions related to:
- Hotel recommendations and bookings
- Hotel amenities (pool, gym, restaurant, Wi-Fi, etc.)
- Travel destinations and locations for stays
- Hotel pricing, ratings, and reviews
- Check-in/check-out, room types, and accommodation details
- Travel tips directly related to hotel stays

If the user asks about ANYTHING outside of hotels, accommodations, or closely related travel/stay topics, respond with:
"I'm Hotel Buddy, your hotel booking assistant! I can only help with hotel-related queries — like finding hotels, comparing prices, checking amenities, or recommending destinations. Please ask me something about hotels!"

Do NOT answer questions about coding, math, science, politics, general knowledge, or any unrelated topic. Stay strictly within the hotel domain.`;

async function generateResponse(userInput, userFilters, conversationHistory = []) {
    const userMessage = userFilters
        ? `User Request: ${userInput}\nPreferences: ${userFilters}`
        : userInput;

    const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I will only respond to hotel and accommodation-related queries." }] },
    ];

    for (const msg of conversationHistory) {
        const geminiRole = msg.role === "bot" ? "model" : msg.role === "user" ? "user" : null;
        if (!geminiRole || typeof msg.text !== "string") continue;
        contents.push({
            role: geminiRole,
            parts: [{ text: msg.text }],
        });
    }

    contents.push({ role: "user", parts: [{ text: userMessage }] });

    const payload = { contents };

    try {
        const response = await axios.post(GEMINI_URL, payload, {
            headers: { "Content-Type": "application/json" }
        });

        const data = response.data;

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "I couldn't find any hotels matching that. Try a different location!";
        }
    } catch (error) {
        if (error.response) {
            console.log(`--- API ERROR (${error.response.status}) ---`);
            console.log(JSON.stringify(error.response.data, null, 2));
            return "The AI server is having trouble. Check terminal for details.";
        }
        console.log(`Local Error: ${error.message}`);
        return "Something went wrong on the server.";
    }
}

app.post('/chat', async (req, res) => {
    try {
        const { message = '', filter = '', history = [] } = req.body;
        const reply = await generateResponse(message, filter, history);
        res.json({ response: reply });
    } catch (err) {
        console.log("Server crash:", err.message);
        res.status(500).json({ response: "Server error." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
