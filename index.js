const container = document.querySelector(".container");

async function getAllUSers() {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
        throw new Error("Somthing went wrong.")
    }

    const getUsers = await response.json();

    return getUsers;
}

async function displayAllUsers() {
    const allUsers = await getAllUSers();

    for (const user of allUsers) {
        const div = document.createElement("div");
        const a = document.createElement("a");
        const button = document.createElement("button");
        div.setAttribute("id", `${user.id}`);
        div.setAttribute("class", "link-with-close");
        a.setAttribute("href", `users.html?id=${user.id}`);
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
    console.log(removeButton);

    removeButton.forEach(button => {
        button.addEventListener("click", async () => {
            const parentDiv = button.closest(".link-with-close");
            const userId = parentDiv.getAttribute("id");
        
            const removeUser = await deleteFromDB(userId);
            console.log(removeUser);
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