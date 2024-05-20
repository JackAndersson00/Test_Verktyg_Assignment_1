const searchURLParams = window.location.search;
const getParams = new URLSearchParams(searchURLParams);
const id = getParams.get("id");
const linkToEdit = document.querySelector("#linkToEdit");

linkToEdit.setAttribute("href", `edit.html?id=${id}`);

async function getUser() {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`);

        if (!response.ok) {
            throw new Error(`Something went wrong when fetching user with id = ${id}`)
        }

        const getUserInfo = await response.json();
        console.log(getUserInfo);
        return getUserInfo;

    } catch(error) {
        console.error(`An error occured when creating user`);
    }
}

async function setUser() {
    const setUserInfo = await getUser();

    document.querySelector("#fname").textContent += setUserInfo.fname;
}

setUser();