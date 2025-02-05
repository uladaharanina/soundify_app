// Send request to backend

let resultArray = localStorage.getItem('results') ?  JSON.parse(localStorage.getItem('results')) : []; //store release results
let searchResultArray = {}; //store search results

const searchResults = document.querySelector("#search_results");
const searchInput = document.querySelector('#search-input');

const releases_results = document.querySelector("#releases_results");



//Display results of fetch
const updateUI = async () => {
    if(resultArray.length > 0){
        resultArray.forEach(item => {
            releases_results.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${item.images[0].url}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.artists[0].name}</p>
                </div>
            </div>
            `;
        })
    }
    else{
    }

}

//Fetch new releases

const getAlbums = async () => {  
    //Check do we have results already
    if(localStorage.getItem('results') !== undefined && localStorage.getItem('results')){
        updateUI();
    }

    else{
    //If not results, check for token
    if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || !localStorage.getItem('token')){
        await getTokens();
    }
    console.log("Fetch albums");
         fetch("/api/getAlbums", {
             headers: {
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
             }
         })
        .then((res) => res.json())
        .then(data => {
            resultArray = data.albums.items;
            localStorage.setItem('results', JSON.stringify(resultArray));
            updateUI();
        })
    
   
    }
}

//Fetch token
const getTokens = async () => {
    await fetch("/api/getTokens")
    .then((res) => res.json())
    .then(data => {
        if(data != undefined){
            localStorage.setItem('token', data.access_token);
        }
        else{
            console.log("Couldn't get tokens");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

//Update search input

const updateInput = (event) => {

    searchInput.value = event.target.value;
}

const fetchArtist = async (searchItem) => {

    if(!localStorage.getItem('token')){
        await getTokens();
    }
    fetch("/api/search", {
        method: 'POST',
        body: JSON.stringify({ searchItem: searchItem }),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'

        }
    })
    .then((res) => res.json())
    .then(data => {
        console.log(data);
        searchResultArray = data;
        updateSearchResult();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const findItem = (e) => {
    e.preventDefault();
    console.log(searchInput.value.length);
    console.log(searchInput);

    if(searchInput.value.length < 2){
        searchInput.value = "Invalid input!";
        searchInput.style.color = "#D9073D";
        searchInput.disabled = true;
        setTimeout(() =>{
            searchInput.value = "";
            searchInput.style.color = "#000000"; 
            searchInput.disabled = false;

        }, 1400)
    }
    else{
        fetchArtist(searchInput.value);
    }

}

// Update the search result container
const updateSearchResult = () => {

        searchResults.innerHTML = "";
        const tracks = searchResultArray.tracks.items;
        console.log(tracks);
        searchResults.innerHTML = `
        <h1>Search results:</h1>
        <div>
            <h6>Tracks:</h6>
            <div class="track-grid"> <!-- Grid container -->
                ${tracks.map((track, index) => {
                    return `
                        <div class="track-item">
                            <p><strong>${track.artists[0].name}</strong></p>
                            <img src=${track.album.images[0].url} alt='album image'/>
                            <a href=${track.external_urls.spotify} class="go-to-track">Go to Track</a>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;


}


//Delete expired token
setInterval(() => {
    localStorage.removeItem('token');
}, 6000)

getAlbums();








