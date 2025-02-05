require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json());
app.use(express.static('public'))

const port = 5173

//Send API to Spotify
app.get('/api/getAlbums', async (req, res) => {

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

app.get('/api/getTokens', async (req, res) => { 

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

//Get Artis

app.post('/api/search', async (req, res) => {
  
    const token = JSON.stringify(req.headers);
    const item = req.body.searchItem;

   try{
        await fetch(`https://api.spotify.com/v1/search?q=${item}&type=artist%2Calbum%2Ctrack&limit=10`, {
        method: 'GET', 
        headers: {
            'Authorization': token,
        }})
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

