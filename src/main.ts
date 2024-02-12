// main.ts - file for TypeScript logic

import axios from 'axios';
console.log(axios);

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
        const res = await axios.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100`);
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
        // ids of repositories to be displayed
        const idsToDisplay = [
            659770253, 720425072, 448405587, 564878137, 747409332];

        // number of pages to be fetched
        const totalPages = 3;

        // Iterate through each page
        for (let page = 1; page <= totalPages; page++) {
            const repos: Repository[] = await getRepositories(page);

            // Filter repositories based on ids
            const filteredRepos = repos.filter(repo => idsToDisplay.includes(repo.id));

            // Display filtered repositories
            filteredRepos.forEach((repo) => {
                // Create a string with repository information
                const repoInfo = `<div class="tracking-wide text-off-white pb-3">${repo.language.toUpperCase()}</div>
                      <div class="text-2xl text-white font-bold pb-3">${repo.name.charAt(0).toUpperCase() + repo.name.slice(1)}</div>
                      <div class="flex text-gray-black justify-between pb-3"><p class='md:mr-2'>Last Updated: ${formatDate(repo.updated_at)}</p>
                      <p>Created At: ${formatDate(repo.created_at)}</p>
                      </div>
                      <div class='flex text-gray-black'>
                      <img src="./images/Symbol.png" alt="symbol-link" width='10px' class="mr-2">
                      <a href="${generateGithubLink(repo.git_url)}" target="_blank" class='font-medium'>Github</a>
                      </div>`;


                // Create a list item
                const repoItem = document.createElement('li');

                // Add classes to the repoItem based on the repository information
                repoItem.classList.add('bg-off-black', 'p-6', 'my-4', 'text-xs', 'rounded');

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