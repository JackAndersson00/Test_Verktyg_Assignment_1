const selectElement = document.querySelector("#age");
const form = document.querySelector("#addUserForm");
const container = document.querySelector(".container");

selectElement.addEventListener("click", (event) => {
    event.preventDefault();
    for (let i = 18; i <= 65; i++) {
        let addAgeOption = document.createElement("option");
        addAgeOption.value = i;
        addAgeOption.textContent = i;
        
        selectElement.appendChild(addAgeOption);
    }
}, { once: true });

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        container.removeChild(toast);
    }, 3000);
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fname = form.querySelector("#fname").value;
    const lname = form.querySelector("#lname").value;
    const username = form.querySelector("#uname").value;
    const age = Number(form.querySelector("#age").value);
    const bio = form.querySelector("#bio").value;

    const createdUser = await createUser(fname, lname, username, age, bio);

    console.log(createUser);
});

async function createUser(fname, lname, uname, age, bio) {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname,
                lname,
                uname,
                age,
                bio
            })
        });

        if (!response.ok) {
            throw new Error("Something went wrong when initalizing a new user.");
        }

        const responseData = await response.json();
        
        return responseData;

    } catch (error) {
        console.error("An error occured when creating user:", error);
    }
}