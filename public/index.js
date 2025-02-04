// Send request to backend

let resultArray = localStorage.getItem('results') ?  JSON.parse(localStorage.getItem('results')) : [];

const releases_results = document.querySelector("#releases_results");
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

}
const getAlbums =  () => {  
    //Check do we have results already
    if(localStorage.getItem('results') !== undefined && localStorage.getItem('results')){
        updateUI();
    }

    else{
        console.log("Make Call");
    //If not results, check for token
    if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
        getTokens();
    }
         fetch("/getAlbums", {
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

const getTokens = async () => {
    await fetch("/getTokens")
    .then((res) => res.json())
    .then(data => {
        if(data != undefined){
            localStorage.setItem('token', data.access_token);
            getAlbums();
        }
        else{
            console.log("Couldn't get tokens");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

    getAlbums();







