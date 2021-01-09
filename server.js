require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({useTempFile: true}));


// Routes
app.use('/user', require('./routes/userRoutes'));

// Make connection to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if (err) {
        console.error(`mongodb error ${err}`)
    } else {
        console.log("Connected to mongodb");
    }

});

app.use('/', (req, res, next) => {
    res.json({msg: "Hello connected"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})