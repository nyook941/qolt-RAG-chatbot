const sendRequestToFastAPI = async (inputText, setChatbotResponse) => {
  const url =
    "https://k5jhm1siei.execute-api.us-east-2.amazonaws.com/default/chatbotAPI";

  const requestData = {
    question: inputText,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();

      if (data && data.output_text) {
        setChatbotResponse(data.output_text);
      } else {
        console.error("Output text not found in the response");
        setChatbotResponse("Output text not found in the response.");
      }
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error("Error:", error);
    setChatbotResponse("An error occurred while sending the request.");
  }
};

export default sendRequestToFastAPI;
