const APIURL ='https://api.github.com/users/';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = search.value;

    if(username){
        getUser(username);
        search.value = '';
    }
});

function getUser(username){
    axios(APIURL + username)
    .then(({data}) => {
        createUserCard(data);
        getRepos(username);
    })
    .catch(err => {
        if(err.response.status == 404){
            createErrorCard('No profile with this username');
        }
    });
}

function getRepos(username){
    axios(APIURL + username + '/repos?sort=created')
    .then(({data}) => {
        addReposToCard(data);
    })
    .catch(err => {
        createErrorCard('Problem fetching repos');
    });
}

function createUserCard(user){
    const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.login}</h2>
                <p>${user.bio || 'No bio available'}</p>
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repositories</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function createErrorCard(msg){
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;
    main.innerHTML = cardHTML;
}

// Add repos to the card, showing up to 3 repo links
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    reposEl.innerHTML = '';
    repos.slice(0, 3).forEach((repo, idx) => {
        const repoLink = document.createElement('a');
        repoLink.classList.add('repo');
        repoLink.classList.add((idx + 1).toString());
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
        repoLink.innerText = repo.name;
        reposEl.appendChild(repoLink);
    });
} 
