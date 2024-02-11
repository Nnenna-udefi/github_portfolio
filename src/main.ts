// main.ts - file for TypeScript logic

import axios from 'axios';
// import { DateTimeFormatOptions } from 'intl';

const username = 'Nnenna-udefi';

interface Repository {
    id: number;
    name: string;
    language: string;
    updated_at: string;
    created_at: string;
    git_url: string;
}

// fetch the repositories for a given page
async function getRepositories(page: number): Promise<Repository[]> {
    try {
        const res = await axios.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100`); // Increased per_page to 100 for fewer requests
        return res.data;
    } catch (error) {
        console.error(`Error fetching repositories for page ${page}:`, error);
        return [];
    }
}

// Display repositories for specific IDs
async function displayReposById() {
    const repoList = document.getElementById('repo-list');

    if (repoList) {
        // Specify the ids of the repositories you want to display
        const idsToDisplay = [
            659770253, 720425072, 448405587, 564878137, 747409332]; // Replace with actual repository ids

        // Specify the number of pages to fetch
        const totalPages = 3;

        // Iterate through each page
        for (let page = 1; page <= totalPages; page++) {
            const repos: Repository[] = await getRepositories(page);

            // Filter repositories based on ids
            const filteredRepos = repos.filter(repo => idsToDisplay.includes(repo.id));

            // Display filtered repositories
            filteredRepos.forEach((repo) => {
                // Create a string with repository information
                const repoInfo = `${repo.language.toUpperCase()} <br>${repo.name.charAt(0).toUpperCase() + repo.name.slice(1)} <br>Last Updated: ${formatDate(repo.updated_at)} \tCreated At: ${formatDate(repo.created_at)} <br>🔗 <a href="${generateGithubLink(repo.git_url)}" target="_blank">Github</a>`;

                // Create a list item
                const repoItem = document.createElement('li');

                // Add classes to the repoItem based on the repository information
                repoItem.classList.add('bg-gray-900', 'p-6', 'my-4', 'text-xs', 'rounded');
                repoItem.classList.add(`language-${repo.language.toLowerCase()}`); // Add a class based on the language

                // Assign the combined repository information to textContent
                repoItem.innerHTML = repoInfo;

                // Append the list item to the repository list
                repoList.appendChild(repoItem);
            });
        }
    }
}

// function to format date
function formatDate(dateString: string): string {
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

// function to generate Github link
function generateGithubLink(gitUrl: string): string {
    return gitUrl; // Return the GitHub URL directly
}


displayReposById();