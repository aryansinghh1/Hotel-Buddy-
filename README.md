# Hotel-Buddy-
I 
# **Intelligent Hotel Booking Chatbot**

An intelligent, conversational hotel-booking assistant that helps users find suitable hotels through natural language. The chatbot understands user preferences such as location, budget, and amenities, and provides personalized hotel recommendations instantly.

---

## **🚀 Features**

* 🧠 *Natural Language Understanding* using Gemini API
* 🔍 Personalized hotel recommendations based on user preferences
* 💬 Simple conversational interface
* ⚡ Instant filtering by location, price, and amenities
* 🌐 Clean and responsive web UI (HTML/CSS)
* 🖥 Backend powered by Flask (Python)

---

## **🛠 Tech Stack**

* **Backend:** Python, Flask
* **AI Model:** Gemini API
* **Frontend:** HTML, CSS
* **Other:** REST API integration, JSON handling

---

## **📌 Project Overview**

This project aims to simplify the hotel booking process by replacing traditional search filters with a natural, chat-based experience. Users simply type their travel requirements, and the system returns smart, context-aware hotel suggestions.

The chatbot processes:

* Location input (e.g., “Hotels in Delhi”)
* Budget preferences (e.g., “Under ₹3000”)
* Amenities (e.g., “with Wi-Fi and breakfast”)
* Combination queries (e.g., “Cheap hotels in Goa with a pool”)

---

## **⚙️ How It Works**

1. User sends a message through the chat interface
2. Flask backend receives the query
3. Backend sends the query to the **Gemini API** for interpretation
4. Gemini returns structured intent and recommendation logic
5. Flask processes the response and sends hotel suggestions back to the UI
6. User receives a conversational reply with matching hotels

---

## **📂 Project Structure**

```
project/
│── app.py                # Flask backend
│── templates/
│     └── index.html      # Frontend UI
│── static/
│     └── styles.css      # Styling
│── requirements.txt      # Dependencies
│── README.md             # Project documentation
```

---




### **2. Install dependencies**

```bash
pip install -r requirements.txt
```

### **3. Add your Gemini API key**

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

### **4. Run the app**

```bash
python app.py
```

### **5. Open in browser**

```
http://127.0.0.1:5000
```

---



## **📘 Future Enhancements**

* User login & profile personalization
* Hotel booking integration (API)
* Support for multiple languages
* Mobile-friendly UI
* Review & rating system

---

