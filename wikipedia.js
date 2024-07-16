let searchResultsE1 = document.getElementById("searchResults");
let searchInputE1 = document.getElementById("searchInput");
let spinnerE1 = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    let divE1 = document.createElement("div");
    divE1.classList.add("result-item");

    let anchorE1 = document.createElement("a");
    anchorE1.href = link;
    anchorE1.target = "_blank";
    anchorE1.textContent = title;
    anchorE1.classList.add("result-title");
    divE1.appendChild(anchorE1);

    let breakuE1 = document.createElement("br");
    divE1.appendChild(breakuE1);

    let anchorE2 = document.createElement("a");
    anchorE2.classList.add("result-url");
    anchorE2.href = link;
    anchorE2.target = "_blank";
    anchorE2.textContent = link;
    divE1.appendChild(anchorE2);

    let breakuE2 = document.createElement("br");
    divE1.appendChild(breakuE2);

    let descriptionE1 = document.createElement("p");
    descriptionE1.classList.add("link-description");
    descriptionE1.textContent = description;
    divE1.appendChild(descriptionE1);

    searchResultsE1.appendChild(divE1);
}

function displayEve(searchResults) {
    spinnerE1.classList.add("d-none");
    searchResultsE1.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchEle(event) {
    if (event.key === "Enter") {
        searchResultsE1.classList.toggle("d-none")
        spinnerE1.classList.remove("d-none");
        searchResultsE1.textContent = "";

        let searchInputValue = searchInputE1.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayEve(search_results);
            });
    }
}
searchInputE1.addEventListener("keydown", searchEle);