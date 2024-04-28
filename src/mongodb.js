const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/artgallery")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("failed to connect");
    });

const RegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const detailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const ImageSchema = new mongoose.Schema({
    image: String
}, {
    collection: "Images",
});

const Registration = mongoose.model("reg_custs", RegistrationSchema);
const Login = mongoose.model("login_custs", LoginSchema);
const Image = mongoose.model("images", ImageSchema); // Changed export name to 'Image'
const details = mongoose.model("details", detailsSchema);

module.exports = { Registration, Login, Image ,details};
