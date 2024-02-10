// main.ts - file for typescript logic

import axios from 'axios';

const username = 'Nnenna-udefi';
const apiUrl = `https://api.github.com/users/${username}/repos`;

// fetch the repositories
async function getRepositories() {
    try {
        const res = await axios.get(apiUrl);
        return res.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

// display respositories
async function displayRepos() {
    const repos = await getRepositories();
    const repoList = document.getElementById('repo-list');

    if (repoList) {
        repos.forEach((repo: any) => {
            const repoItem = document.createElement('li');
            repoItem.textContent = repo.name;
            repoList.appendChild(repoItem);
        });
    }
}

displayRepos();