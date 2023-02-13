window.addEventListener('DOMContentLoaded', async () => {
    const advisoryBoard = document.querySelector('.advisoryBoard');
    let advisories = await axios.get('/advisory/getAdvisories');
    advisories = advisories.data;

    advisories.forEach(advisory => {
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

        advisoryBoard.appendChild(card);
    });
})