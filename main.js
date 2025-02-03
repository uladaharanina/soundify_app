require('dotenv').config()
const express = require('express')
const app = express()


app.use(express.static('public'))

const port = 5173

//Send API to Spotify
app.get('/getAlbums', async (req, res) => {

    const token = JSON.stringify(req.headers);
   try{
        await fetch("https://api.spotify.com/v1/browse/new-releases", {
        method: 'GET', 
        headers: {'Authorization': token}})
        .then((response) => response.json())
        .then((data) => {
            res.json(data);
        })
   }
   catch(err){
    console.error(err);
    res.status(500).send('Server Error');
   }
})

app.get('/getTokens', async (req, res) => { 

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const json = await result.json();
    res.json(json);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/*
const searchInput = document.querySelector("#search-input");
console.log(process.env);
const searchForItem = async (e) => {

    e.preventDefault();

    if(searchInput != null){

        const result = await fetch("https://api.spotify.com/v1/search");
        const data = await result.json();

    }
}

    //Get album
    const getSeveralAlbums  = async () => {

        console.log("data");
        const result = await fetch("https://api.spotify.com/v1/albums", {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        const data = await result.json();
        res.send(data)

    }

//Show popular songs

const getSeveralAlbums  = async () => {

    console.log("data");
    const result = await fetch("https://api.spotify.com/v1/albums", {
        headers: {
            'Authorization': `Bearer ${envaccess_token}`
        }
    });
    const data = await result.json();
    console.log(data);
}

getSeveralAlbums();
*/