const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('public'));

// Define a route for handling form submissions
app.post('/submit', upload.single('file'), (req, res) => {
    const assignmentName = req.body.assignmentName;
    const subject = req.body.subject;
    const description = req.body.description;
    const file = req.file;

    // Perform any additional validation or processing here

    // Respond to the client with a JSON object indicating success or failure
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
