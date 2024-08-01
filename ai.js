document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.getElementById("chatbox");
    const userinput = document.getElementById("userinput");

    userinput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const userMessage = userinput.value;
            if (userMessage.trim() !== "") {
                displayMessage(userMessage, "user");
                userinput.value = "";
                sendToChatbot(userMessage);
            }
        }
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
        fetch("https://api.example.com/chat", {  // Replace with your actual API endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer sk-proj-LKTJiYqPrlJgiV4Ds3KOT3BlbkFJxhHggczA1PNRlbwCNnBz`
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.reply, "bot");
        })
        .catch(error => {
            console.error("Error:", error);
            displayMessage("Sorry, there was an error.", "bot");
        });
    }
});
