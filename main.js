// main.ts - file for typescript logic
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const username = 'Nnenna-udefi';
const apiUrl = `https://api.github.com/users/${username}/repos`;
// fetch the repositories
function getRepositories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios.get(apiUrl);
            return res.data;
        }
        catch (error) {
            console.error('Error fetching repositories:', error);
            return [];
        }
    });
}
// display respositories
function displayRepos() {
    return __awaiter(this, void 0, void 0, function* () {
        const repos = yield getRepositories();
        const repoList = document.getElementById('repo-list');
        if (repoList) {
            repos.forEach((repo) => {
                const repoItem = document.createElement('li');
                repoItem.textContent = repo.name;
                repoList.appendChild(repoItem);
            });
        }
    });
}
displayRepos();
