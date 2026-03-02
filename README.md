# Hotel-Buddy-

# **Intelligent Hotel Booking Chatbot**

An intelligent, conversational hotel-booking assistant that helps users find suitable hotels through natural language. The chatbot understands user preferences such as location, budget, and amenities, and provides personalized hotel recommendations instantly.

---

## **Features**

* Natural Language Understanding using Gemini API
* Personalized hotel recommendations based on user preferences
* Simple conversational interface
* Instant filtering by location, price, and amenities
* Clean and responsive React UI
* Backend powered by Node.js (Express)

---

## **Tech Stack**

* **Backend:** Node.js, Express
* **Frontend:** React, Vite
* **AI Model:** Gemini API
* **Other:** REST API integration, JSON handling

---

## **Project Overview**

This project aims to simplify the hotel booking process by replacing traditional search filters with a natural, chat-based experience. Users simply type their travel requirements, and the system returns smart, context-aware hotel suggestions.

The chatbot processes:

* Location input (e.g., "Hotels in Delhi")
* Budget preferences (e.g., "Under 3000")
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
|-- backend/
|     └── server.js               # Express backend
|-- frontend/
|     |-- index.html              # Vite entry HTML
|     |-- package.json            # Frontend dependencies
|     |-- vite.config.js          # Vite config with API proxy
|     └── src/
|           |-- main.jsx          # React entry point
|           |-- App.jsx           # Main app component
|           |-- App.css           # Styles
|           └── components/
|                 |-- ChatMessage.jsx
|                 └── FilterDropdown.jsx
|-- package.json                  # Root (backend deps + scripts)
|-- README.md
```

---

## **Getting Started**

### **1. Clone the repository**

```bash
git clone <your-repo-url>
cd Hotel-Buddy-
```

### **2. Install dependencies**

```bash
npm install
cd frontend && npm install && cd ..
```

### **3. Add your Gemini API key**

Set the environment variable `GEMINI_API_KEY`, or open `backend/server.js` and replace the placeholder.

### **4. Run both backend and frontend together**

```bash
npm run dev
```

This starts the Express backend (port 5000) and the Vite dev server (port 5173) concurrently.

Or run them separately:

```bash
npm start          # backend only
npm run client     # frontend only
```

### **5. Open in browser**

```
http://localhost:5173
```

---

## **Future Enhancements**

* User login & profile personalization
* Hotel booking integration (API)
* Support for multiple languages
* Mobile-friendly UI
* Review & rating system

---
