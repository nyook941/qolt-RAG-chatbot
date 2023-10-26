import requests

# Define the URL of your FastAPI endpoint
url = "http://localhost:8000/api/chatbot"  # Replace with your actual URL

# Define the input text you want to send to the chatbot
input_text = "Hello, chatbot! Who is Professor Tamil?"

# Create a dictionary with the input data
data = {"text": input_text}

# Send a POST request to the endpoint with the input data
response = requests.post(url, json=data)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the JSON response
    response_json = response.json()
    chatbot_response = response_json["response"]
    print("Chatbot Response:", chatbot_response)
else:
    print("Request failed with status code:", response.status_code)
