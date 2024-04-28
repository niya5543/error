const express = require('express');
const app = express();
const path = require("path");
const multer = require("multer"); 
const { Registration, Login ,details} = require("./mongodb");


const templatePath = path.join(__dirname, '../templates');
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
    res.render("index");
});

// Route to render the login page
app.get("/login", (req, res) => {
    res.render("login_cust");
});
app.get("/create", (req, res) => {
    console.log("Accessed /create_exhibition route");
    res.render("create_e"); // Assuming "create_exhibition.hbs" is in your templates directory
});
app.get("/lover", (req, res) => {
    console.log("Accessed");
    res.render("art_lover"); // Assuming "create_exhibition.hbs" is in your templates directory
});

app.get("/exhib", (req, res) => {
    console.log("exhib Accessed");
    res.render("exhib"); // Assuming "create_exhibition.hbs" is in your templates directory
});
app.get("/cart", (req, res) => {
    console.log("Accessed");
    res.render("cart"); // Assuming "create_exhibition.hbs" is in your templates directory
});
app.get("/sell", (req, res) => {
    console.log("sell Accessed");
    res.render("sell"); // Assuming "create_exhibition.hbs" is in your templates directory
});
app.get("/auction", (req, res) => {
    console.log("auction Accessed");
    res.render("auction"); // Assuming "create_exhibition.hbs" is in your templates directory
});
app.get("/addart", (req, res) => {
    console.log("addart Accessed");
    res.render("addart"); // Assuming "create_exhibition.hbs" is in your templates directory
});
app.get("/bid", (req, res) => {
    console.log("bid Accessed");
    res.render("bid"); // Assuming "create_exhibition.hbs" is in your templates directory
});


// Route to handle login form submission
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Registration.findOne({ email, password });
        if (user) {
            res.render("index");
        } else {
            res.send("Wrong email or password");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.send("An unexpected error occurred. Please try again later.");
    }
});

// Route to render the signup page
app.get("/signup", (req, res) => {
    console.log("GET SIGN UP"); 
    res.render("reg_cust");
});
app.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.render("reg_cust", { errorMessage: "Passwords do not match" });
    }
    try {
        await Registration.create({ email, password, confirmPassword });
        console.log("Data inserted successfully");
        res.render("login_cust"); // Render the login page after signup
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
        // Handle the error appropriately
        res.render("reg_cust", { errorMessage: "An unexpected error occurred. Please try again later." });
    }
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      // Get file path
      const imagePath = req.file.path;
  
      // Save image path to MongoDB
      const image = new Image({
        imagePath: imagePath,
        description: req.body.description,
        price: req.body.price
      });
      await image.save();
  
      res.send('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  app.post('/addart', async (req, res) => {
    try {
      const { email, description, price } = req.body;
  
      // Create a new document for the artwork details
      await details.create({ email, description, price });
      console.log("Data inserted successfully");
  
      // Redirect the user to the /art page after successful submission
      res.redirect("/art");
    } catch (error) {
      console.error('Error saving artwork details:', error);
      res.status(500).send('Error saving artwork details');
    }
  });
  

app.get('/art', async (req, res) => {
    try {
      // Retrieve all artwork details from MongoDB
      const artworkDetails = await details.find({});
      res.json(artworkDetails);
    } catch (error) {
      console.error('Error fetching artwork details:', error);
      res.status(500).send('Error fetching artwork details');
    }
  });
  

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
