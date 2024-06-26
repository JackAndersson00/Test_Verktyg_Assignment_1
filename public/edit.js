const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const selectElement = document.getElementById("age");
const form = document.getElementById("addUserForm");
const container = document.getElementById("container");


async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);

    const responseData = await response.json();
    
    if (!response.ok) {
        showMessage(responseData.message);
        throw new Error(responseData.message);
    }

    return responseData;
}
async function getUser() {
    const userInfo = await getUserById(id);
    setUserAge(userInfo);
    setFormValues(userInfo);
}

async function editUserInfo(fname, lname, uname, age, bio) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
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
}

form.addEventListener("submit",  async (event) => {
    event.preventDefault();

    const fname = form.querySelector("#fname").value;
    const lname = form.querySelector("#lname").value;
    const uname = form.querySelector("#uname").value;
    const age = Number(form.querySelector("#age").value);
    const bio = form.querySelector("#bio").value;

    const editedUser = await editUserInfo(fname, lname, uname, age, bio);
    console.log(editedUser);
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
    document.getElementById("uname").value = user.uname;
    document.getElementById("bio").value = user.bio;
}

getUser();