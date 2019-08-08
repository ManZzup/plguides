const express = require('express');
const multer = require('multer');
const cors = require('cors')

const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const app = express();
app.use(cors());

// It's very crucial that the file name matches the name attribute in your html
app.get('/hello', (req, res) => {
    res.send("HELLO");
})
app.post('/upload', upload.single('file'), (req, res) => {
  res.send("OKAY")
});

app.listen(5000);