function showMessage(message) {
    const container = document.querySelector(".container");
    const responseMessageDiv = document.createElement("h3");
    
    responseMessageDiv.setAttribute("id", "response-msg");
    responseMessageDiv.textContent = message;
    container.appendChild(responseMessageDiv);

    setTimeout(() => {
        container.removeChild(responseMessageDiv)
    }, 3000);
}