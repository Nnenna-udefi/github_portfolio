// main.ts - file for TypeScript logic
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const username = 'Nnenna-udefi';
// fetch the repositories for a given page
function getRepositories(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100`); // Increased per_page to 100 for fewer requests
            return res.data;
        }
        catch (error) {
            console.error(`Error fetching repositories for page ${page}:`, error);
            return [];
        }
    });
}
// Display repositories for specific IDs
function displayReposById() {
    return __awaiter(this, void 0, void 0, function* () {
        const repoList = document.getElementById('repo-list');
        if (repoList) {
            // Specify the ids of the repositories you want to display
            const idsToDisplay = [
                659770253, 720425072, 448405587, 564878137, 747409332
            ]; // Replace with actual repository ids
            // Specify the number of pages to fetch
            const totalPages = 3;
            // Iterate through each page
            for (let page = 1; page <= totalPages; page++) {
                const repos = yield getRepositories(page);
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
    });
}
// function to format date
function formatDate(dateString) {
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}
// function to generate Github link
function generateGithubLink(gitUrl) {
    return gitUrl; // Return the GitHub URL directly
}
// function generateGithubLink(gitUrl: string): string {
//     const githubLink = document.createElement('a')
//     githubLink.href = gitUrl;
//     githubLink.textContent = 'Github';
//     const container = document.createElement('div');
//     container.appendChild(githubLink);
//     return container.innerHTML;
// }
displayReposById();
