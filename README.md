# Hotel-Buddy-

# **Intelligent Hotel Booking Chatbot**

An intelligent, conversational hotel-booking assistant that helps users find suitable hotels through natural language. The chatbot understands user preferences such as location, budget, and amenities, and provides personalized hotel recommendations instantly.

---

## **Features**

* Natural Language Understanding using Gemini API
* Personalized hotel recommendations based on user preferences
* Simple conversational interface
* Instant filtering by location, price, and amenities
* Clean and responsive web UI built with React
* Backend powered by Node.js (Express)

---

## **Tech Stack**

* **Frontend:** React, Vite
* **Backend:** Node.js, Express
* **AI Model:** Gemini API

---

## **Project Overview**

This project aims to simplify the hotel booking process by replacing traditional search filters with a natural, chat-based experience. Users simply type their travel requirements, and the system returns smart, context-aware hotel suggestions.

The chatbot processes:

* Location input (e.g., "Hotels in Delhi")
* Budget preferences (e.g., "Under ₹3000")
* Amenities (e.g., "with Wi-Fi and breakfast")
* Combination queries (e.g., "Cheap hotels in Goa with a pool")

---

## **How It Works**

1. User sends a message through the React chat interface
2. Express backend receives the query
3. Backend sends the query to the **Gemini API** for interpretation
4. Gemini returns structured intent and recommendation logic
5. Express processes the response and sends hotel suggestions back to the UI
6. User receives a conversational reply with matching hotels

---

## **Project Structure**

```
Hotel-Buddy-/
├── frontend/                 # React app (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       └── components/
│           ├── ChatMessage.jsx
│           └── FilterDropdown.jsx
├── backend/
│   ├── server.js             # Express backend
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
└── README.md
```

---

## **Getting Started**

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Add your Gemini API key

Edit `backend/.env`:

```
PORT=5000
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

### 3. Run the app

```bash
# Terminal 1 - Start the backend
cd backend
node server.js

# Terminal 2 - Start the frontend
cd frontend
npm run dev
```

### 4. Open in browser

Go to `http://localhost:5173`

---

## **Future Enhancements**

* User login & profile personalization
* Hotel booking integration (API)
* Support for multiple languages
* Mobile-friendly UI
* Review & rating system

---
