document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.getElementById("chatbox");
    const userinput = document.getElementById("userinput");
    const sendbtn = document.getElementById("sendbtn");

    function sendMessage() {
        const userMessage = userinput.value;
        if (userMessage.trim() !== "") {
            displayMessage(userMessage, "user");
            userinput.value = "";
            sendToChatbot(userMessage);
        }
    }

    userinput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    sendbtn.addEventListener("click", () => {
        sendMessage();
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function sendToChatbot(message) {
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer sk-proj-LKTJiYqPrlJgiV4Ds3KOT3BlbkFJxhHggczA1PNRlbwCNnBz` // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Or another model if applicable
                messages: [
                    { role: "user", content: message }
                ]
            })
        })
        .then(response => response.json())
        .then(data => {
            const botReply = data.choices[0].message.content;
            displayMessage(botReply, "bot");
        })
        .catch(error => {
            console.error("Error:", error);
            displayMessage("Sorry, there was an error.", "bot");
        });
    }
});

