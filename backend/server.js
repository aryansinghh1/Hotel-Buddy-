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

IMPORTANT RULES FOR RESPONDING:
1. When a user asks for hotel recommendations, ALWAYS provide a list of specific hotel names with details (price range, rating, key amenities) right away. Do NOT keep asking clarifying questions without giving results first.
2. If the user has given enough info (city, budget, or hotel type), respond with hotel recommendations immediately. You can ask optional follow-up questions AFTER providing the list, not before.
3. Short follow-up messages from the user (like "yes", "ok", "give me", "show me", dates, city names, etc.) are part of the ongoing hotel conversation — treat them as valid hotel-related replies and respond helpfully. NEVER reject them.
4. If some details are missing (like exact dates), provide recommendations anyway and mention that prices may vary by date.

If the user asks about something COMPLETELY unrelated to hotels, accommodations, or travel/stay topics (like coding, math, science, politics, general knowledge), respond with:
"I'm Hotel Buddy, your hotel booking assistant! I can only help with hotel-related queries — like finding hotels, comparing prices, checking amenities, or recommending destinations. Please ask me something about hotels!"

Do NOT answer questions about coding, math, science, politics, general knowledge, or any unrelated topic. Stay strictly within the hotel domain.`;

async function generateResponse(userInput, userFilters, history) {
    const userMessage = userFilters
        ? `User Request: ${userInput}\nPreferences: ${userFilters}`
        : userInput;

    // Build conversation history for Gemini
    const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I will only respond to hotel and accommodation-related queries." }] },
    ];

    // Append past conversation turns (skip the initial welcome message)
    if (Array.isArray(history) && history.length > 0) {
        for (const turn of history.slice(1)) {
            contents.push({
                role: turn.role === "user" ? "user" : "model",
                parts: [{ text: turn.text }]
            });
        }
    }

    // Append the current user message
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
