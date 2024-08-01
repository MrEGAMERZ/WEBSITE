document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    console.log("User input:", userInput);
    if (userInput.trim() === "") return;

    addMessage("User", userInput);
    document.getElementById("user-input").value = "";

    try {
        const response = await getAIResponse(userInput);
        addMessage("AI", response);
    } catch (error) {
        console.error("Error getting AI response:", error);
        addMessage("System", "There was an error processing your request.");
    }
});

async function getAIResponse(message) {
    console.log("Sending message to AI:", message);
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-proj-Zg0JHIOyNjypaMVnOCn6T3BlbkFJoOhhxP2QvwSm7xEcxedG`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: message }]
            })
        });

        console.log("API response status:", response.status);

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error("API response error:", errorDetails);
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data);
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        throw error;
    }
}

function addMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElem = document.createElement("div");
    messageElem.className = "message";
    messageElem.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}
