document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    addMessage("User", userInput);
    document.getElementById("user-input").value = "";

    const response = await getAIResponse(userInput);
    addMessage("AI", response);
});

async function getAIResponse(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-Zg0JHIOyNjypaMVnOCn6T3BlbkFJoOhhxP2QvwSm7xEcxedG`
        },
        body: JSON.stringify({
            model: 'gpt-4', // or the model you are using
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

function addMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElem = document.createElement("div");
    messageElem.className = "message";
    messageElem.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}
