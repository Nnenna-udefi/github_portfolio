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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
var username = 'Nnenna-udefi';
// fetch the repositories for a given page
function getRepositories(page) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("https://api.github.com/users/".concat(username, "/repos?page=").concat(page, "&per_page=100"))];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching repositories for page ".concat(page, ":"), error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Display repositories for specific IDs
function displayReposById() {
    return __awaiter(this, void 0, void 0, function () {
        var repoList, idsToDisplay_1, totalPages, page, repos, filteredRepos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repoList = document.getElementById('repo-list');
                    if (!repoList) return [3 /*break*/, 4];
                    idsToDisplay_1 = [
                        659770253, 720425072, 448405587, 564878137, 747409332
                    ];
                    totalPages = 3;
                    page = 1;
                    _a.label = 1;
                case 1:
                    if (!(page <= totalPages)) return [3 /*break*/, 4];
                    return [4 /*yield*/, getRepositories(page)];
                case 2:
                    repos = _a.sent();
                    filteredRepos = repos.filter(function (repo) { return idsToDisplay_1.includes(repo.id); });
                    // Display filtered repositories
                    filteredRepos.forEach(function (repo) {
                        // Create a string with repository information
                        var repoInfo = "<div class=\"tracking-wide text-off-white pb-3\">".concat(repo.language.toUpperCase(), "</div>\n                      <div class=\"text-2xl text-white font-bold pb-3\">").concat(repo.name.charAt(0).toUpperCase() + repo.name.slice(1), "</div>\n                      <div class=\"flex text-gray-black justify-between pb-3\"><p class='md:mr-2'>Last Updated: ").concat(formatDate(repo.updated_at), "</p>\n                      <p>Created At: ").concat(formatDate(repo.created_at), "</p>\n                      </div>\n                      <div class='flex text-gray-black'>\n                      <img src=\"./images/Symbol.png\" alt=\"symbol-link\" width='10px' class=\"mr-2\">\n                      <a href=\"").concat(generateGithubLink(repo.git_url), "\" target=\"_blank\" class='font-medium'>Github</a>\n                      </div>");
                        // Create a list item
                        var repoItem = document.createElement('li');
                        // Add classes to the repoItem based on the repository information
                        repoItem.classList.add('bg-off-black', 'p-6', 'my-4', 'text-xs', 'rounded');
                        // Assign the combined repository information to textContent
                        repoItem.innerHTML = repoInfo;
                        // Append the list item to the repository list
                        repoList.appendChild(repoItem);
                    });
                    _a.label = 3;
                case 3:
                    page++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// function to format date
function formatDate(dateString) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date(dateString);
    var day = date.getDate().toString().padStart(2, '0');
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    return "".concat(month, " ").concat(day, ", ").concat(year);
}
// function to generate Github link
function generateGithubLink(gitUrl) {
    return gitUrl; // Return the GitHub URL directly
}
displayReposById();
