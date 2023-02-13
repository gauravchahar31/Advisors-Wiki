window.addEventListener('DOMContentLoaded', async () => {
    let advisories = await axios.get('/advisory/getUserAdvisories');
    advisories = advisories.data;

    advisories.forEach(advisory => {
        addAdvisory(advisory);
    });
})

document.querySelector('.navbar-toggler').addEventListener('click', async() => {
    await axios.get('/user/logout');
    window.location.href = '/';
})

async function addAdvisory(advisory){
    const advisoryBoard = document.querySelector('.advisoryBoard');

    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('style', 'width: 18rem;');

    const image = document.createElement('img');
    image.setAttribute('class', 'card-img-top');
    image.setAttribute('src', '/assets/advisoryImage.jpeg');
    card.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    card.appendChild(cardBody);

    const advioryTitle = document.createElement('h5');
    advioryTitle.innerHTML = advisory.name;
    cardBody.appendChild(advioryTitle);

    const advisoryDescription = document.createElement('p');
    advisoryDescription.setAttribute('class',  'card-text');
    advisoryDescription.innerHTML = advisory.description;
    cardBody.appendChild(advisoryDescription);

    const editButton = document.createElement('a');
    editButton.setAttribute('class', 'btn btn-primary');
    editButton.setAttribute('data-toggle','modal');
    editButton.setAttribute('data-target','#editModal');
    editButton.innerHTML = 'Edit';
    card.appendChild(editButton);

    const deleteButton = document.createElement('a');
    deleteButton.setAttribute('class', 'btn btn-primary');
    deleteButton.setAttribute('style', 'margin-top: 10px;');
    deleteButton.innerHTML = 'Delete';
    card.appendChild(deleteButton);

    advisoryBoard.appendChild(card);


    deleteButton.addEventListener('click', async () => {
        await axios.delete(`/advisory/deleteAdvisory?advisoryId=${advisory._id}`);
        advisoryBoard.removeChild(card);
    });

    editButton.addEventListener('click', () => {
        document.querySelector('#editName').value = advisory.name;
        document.querySelector('#editDescription').value = advisory.description;
        document.querySelector('#advisoryId').value = advisory._id;
    });
}

async function createNewAdvisory(form, e){
    try{
        e.preventDefault();
        const newAdvisory = await axios.post(`/advisory/createNew`, {
            name : form.name.value,
            description : form.description.value,
        })
        await addAdvisory(newAdvisory.data);
        document.querySelector('.close').click();
    }
    catch(err){
        document.querySelector('#responseBox').innerHTML = err.response.data;
        console.log(err);
    }
}

async function editAdvisory(form, e){
    try{
        e.preventDefault();
        await axios.put(`/advisory/updateAdvisory`, {
            name : form.name.value,
            description : form.description.value,
            advisoryId: form.advisoryId.value
        })
        window.location.href = '/user/adminPage';
    }
    catch(err){
        document.querySelector('#responseBox').innerHTML = err.response.data;
        console.log(err);
    }
}