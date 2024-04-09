import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3000;
const API_URL = "https://picsum.photos";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.render("index.ejs", { data: "Image" });
});

app.post("/image", async (req, res) => {
   try {
      const width = req.body.width;
      const height = req.body.height;
      
      const response = await axios.get(API_URL + `/${width}/${height}`);
      const imageUrl = response.request.res.responseUrl; // Extract the image URL
      res.render("index.ejs", { imageUrl }); // Pass the image URL to the template
   } catch (error) {
      console.log(error.response.data);
      res.status(500);
   }
});

//Console log predefined port when start server 
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});