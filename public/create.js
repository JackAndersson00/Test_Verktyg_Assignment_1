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

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fname = form.querySelector("#fname").value;
    const lname = form.querySelector("#lname").value;
    const username = form.querySelector("#uname").value;
    const age = Number(form.querySelector("#age").value);
    const bio = form.querySelector("#bio").value;

    const createdUser = await createUser(fname, lname, username, age, bio);
});

async function createUser(fname, lname, uname, age, bio) {
    
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

    const responseData = await response.json();

    if (!response.ok) {
        showMessage(responseData.message);
        throw new Error(responseData.message);
    } else {
        showMessage(responseData.message);
    }

    return responseData;
};