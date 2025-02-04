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
