## Soundify App

### How to install and run

**1. Clone repo to your local machine with**

Open your terminal and navigate to the directory where you want to clone the project, then run the following command:

```bash
cd yourdirectory
git clone https://github.com/uladaharanina/soundify_app.git
```

**2. Install dependencies**

Once the repository is cloned, navigate into the project folder and install the required dependencies:
```bash
npm install
```

**3. Set Up Environment Variables**
Create a `.env` file in the root of the project directory and paste the following:

```bash
CLIENT_ID=replacewithclientid
CLIENT_SECRET=replacewithclientsecret 
```

**You can find the credentials:** https://developer.spotify.com/documentation/web-api

Should be in your account settings

**4. Run the Application**

```
cd Soundify_App
node main.js
```

Finally, open your browser and go to http://localhost:5173/


**Make sure that your local storage does not have old "token" 



# API Documentation

This documentation covers the available routes and endpoints for the Express-based server that interacts with the Spotify API. The server provides functionality to fetch albums, obtain tokens, and search for artists, albums, and tracks from the Spotify API.

---

## 1. **/api/getAlbums** - Fetch Spotify New Releases

### Description:
This endpoint fetches the latest new releases from Spotify. It uses the Spotify `Browse New Releases` endpoint and returns data about the new albums.

### Method:
`GET`

### Request Headers:
- **Authorization**: A valid OAuth token from the Spotify API (included in the request header).

### Response:
Returns a JSON object containing data about the new album releases.

## 2. **/api/getTokens** - Fetch Spotify Access Token

### Description:
This endpoint fetches an access token for Spotify using the client credentials flow. It is used to authorize subsequent API requests to Spotify.

### Method:
GET

### Request Headers:
No headers are required for this request.
### Response:
Returns a JSON object containing the access_token that can be used for authorization in subsequent requests to the Spotify API.

## 3. /api/search - Search for Artists, Albums, or Tracks

### Description:
This endpoint allows searching for artists, albums, or tracks on Spotify. It takes a search term (e.g., artist name, album name) as input and returns matching results.

### Method:
POST


### Request Body:

```json
{
  "searchItem": "<search_term>"
}
```

### Request Headers:
No headers are required for this request.
### Response:
Returns a JSON object containing the access_token that can be used for authorization in subsequent requests to the Spotify API.


