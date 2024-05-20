const container = document.querySelector(".container");

async function getAllUsers() {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
        throw new Error("Somthing went wrong.")
    }

    const getUsers = await response.json();
    console.log(getUsers);

    return getUsers;
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

    remove();
}
function remove() {
    const removeButton = document.querySelectorAll(".close-button");

    removeButton.forEach(button => {
        button.addEventListener("click", async () => {
            const parentDiv = button.closest(".link-with-close");
            const userId = parentDiv.getAttribute("id");
        
            const removeUser = await deleteFromDB(userId);
            console.log(removeUser);

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

    const result = await response.json();

    return result;
}

displayAllUsers();