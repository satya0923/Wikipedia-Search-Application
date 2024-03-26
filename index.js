let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    //creating result item 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //creating title Element
    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    resultItemEl.appendChild(titleEl);

    //createing title break Element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //creating url item 
    let urlEl = document.createElement("url");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //creating link break Element 
    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    //creating description Element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-descreption");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(search_results) {
    //Hiding spinner
    spinner.classList.toggle("d-none");
    /* display for single search result
    let result = search_results[0];
    createAndAppendSearchResult(result);*/

    //display for the multiple search result
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

//Getting user entered text
function searchWikipedia(event) {
    if (event.key === "Enter") {
        //displaying spinner 
        spinner.classList.toggle("d-none");

        //clearing previous search results
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;

        //Accessing url in browser
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        //request configuration
        let options = {
            method: "GET"
        };
        //Making http request using fetch()
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                //display search results
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);
