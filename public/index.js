const container = document.querySelector(".container");

async function getAllUsers() {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
        const errorMessage = await response.json();
        showMessage(errorMessage.message);
        throw new Error(response.message);
    }

    const responseMessage = await response.json();
    
    return responseMessage;
}

async function displayAllUsers() {
    const allUsers = await getAllUsers();

    for (const user of allUsers) {
        const div = document.createElement("div");
        const a = document.createElement("a");
        const button = document.createElement("button");
        div.setAttribute("id", `${user.ID}`);
        div.setAttribute("class", "link-with-close");
        a.setAttribute("href", `users.html?id=${user.ID}`);
        a.textContent = `${user.fname} ${user.lname}`;
        button.setAttribute("class", "close-button");
        button.textContent = "x";
        div.appendChild(a);
        div.appendChild(button);
        container.appendChild(div);
    };

    removeProfile();
}

function removeProfile() {
    const removeButton = document.querySelectorAll(".close-button");

    removeButton.forEach(button => {
        button.addEventListener("click", async () => {
            const parentDiv = button.closest(".link-with-close");
            const userId = parentDiv.getAttribute("id");
        
            const removeUser = await deleteFromDB(userId);
            
            container.removeChild(parentDiv);
        });
    })
}

async function deleteFromDB(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseMessage = await response.json();

    if (!response.ok) {
        showMessage(responseMessage.message);
        throw new Error(responseMessage.message);
    } else {
        showMessage(responseMessage.message);
    }
    
    
    
    //return result;
}

displayAllUsers();