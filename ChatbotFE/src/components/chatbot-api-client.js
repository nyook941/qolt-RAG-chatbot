class ChatbotAPIClient {
  constructor() {
    this.baseurl =
      "https://k5jhm1siei.execute-api.us-east-2.amazonaws.com/default/";
  }
  chatbotRequest(rawQuestionStr) {
    requestOptions = {
      method: "POST",
      body: JSON.stringify({ question: rawQuestionStr }),
    };
    url = this.baseurl + "chatbotAPI";
    response = this.makeRequest(url, requestOptions);
    return response.output_text;
  }

  viewFiles() {
    requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    url = this.baseurl + "documents";
    response = this.makeRequest(url, requestOptions);
    return response.json();
  }

  async makeRequest(url, requestOptions) {
    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
}
