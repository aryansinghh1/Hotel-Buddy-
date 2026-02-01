from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 1. PASTE YOUR API KEY HERE
GEMINI_API_KEY = "paste you api key to use" 

# 2. Use the exact model name found in your terminal list
TARGET_MODEL = "gemini-2.5-flash-lite"

# 3. Corrected URL structure
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1/models/{TARGET_MODEL}:generateContent?key={GEMINI_API_KEY}"

def generate_response(user_input, user_filters=None):
    # Combine message and filters
    full_prompt = f"User Request: {user_input}\nPreferences: {user_filters}" if user_filters else user_input

    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": full_prompt}]}]
    }

    try:
        response = requests.post(GEMINI_URL, headers=headers, json=payload)
        
        if response.status_code != 200:
            print(f"--- API ERROR ({response.status_code}) ---")
            print(response.text)
            return "The AI server is having trouble. Check terminal for details."

        data = response.json()
        
        # Safely extract the text response
        if 'candidates' in data and data['candidates']:
            return data['candidates'][0]['content']['parts'][0]['text']
        else:
            return "I couldn't find any hotels matching that. Try a different location!"
            
    except Exception as e:
        print(f"Local Error: {e}")
        return "Something went wrong on the server."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    user_filters = data.get('filter', '') 
    
    reply = generate_response(user_message, user_filters)
    return jsonify({'response': reply})

if __name__ == '__main__':
    app.run(debug=True, port=5000)