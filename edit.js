const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(queryString);

console.log(id);

const selectElement = document.getElementById("age");
const form = document.getElementById("addUserForm");
const container = document.getElementById("container");


async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const userInfo = await response.json();

    return userInfo;
}
async function getUser() {
    const userInfo = await getUserById(id);
    setUserAge(userInfo);
    setFormValues(userInfo);
}

async function editUserInfo(id, fname, lname, username, age, bio) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            fname,
            lname,
            username,
            age,
            bio
        })
    });

    const editedUser = await response.json();

    return editedUser;
}

form.addEventListener("submit",  async (event) => {
    event.preventDefault();

    const fname = form.querySelector("#fname").value;
    const lname = form.querySelector("#lname").value;
    const username = form.querySelector("#uname").value;
    const age = Number(form.querySelector("#age").value);
    const bio = form.querySelector("#bio").value;

    const editedUser = await editUserInfo(id, fname, lname, username, age, bio);

    window.alert(`Changes to ${editedUser.fname} ${editedUser.lname} profile have been made.`);
});

selectElement.addEventListener("click", () => {
    for (let i = 18; i <= 65; i++) {
        selectElement.firstElementChild.value = "";
        selectElement.firstElementChild.textContent = "";
        let addAgeOption = document.createElement("option");
        addAgeOption.value = i;
        addAgeOption.textContent = i;
        
        selectElement.appendChild(addAgeOption);
    }
}, {once: true});

function setUserAge(user) {
    let userAge = document.createElement("option");
    userAge.value = user.age.toString();
    userAge.textContent = user.age;

    selectElement.appendChild(userAge);
} 

function setFormValues(user) {
    document.getElementById("fname").value = user.fname;
    document.getElementById("lname").value = user.lname;
    document.getElementById("uname").value = user.username;
    document.getElementById("bio").value = user.bio;
}

getUser();