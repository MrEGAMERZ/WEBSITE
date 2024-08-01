function sendToChatbot(message) {
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer sk-proj-LKTJiYqPrlJgiV4Ds3KOT3BlbkFJxhHggczA1PNRlbwCNnBz`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: message }
            ]
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const botReply = data.choices[0].message.content;
        displayMessage(botReply, "bot");
    })
    .catch(error => {
        console.error("Error:", error);
        displayMessage("Sorry, there was an error.", "bot");
    });
}
