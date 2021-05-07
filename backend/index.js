const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const Blog = require("./models/Blog.js");
const { response } = require("express");

mongoose.connect('mongodb://localhost/Blog', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)).catch(err => console.error('Error connecting to mongo', err));



app.get("/getPost", (req, res) => Blog.find().then((response) => res.json(response)));


app.patch('/update/:postId', (req, res) => {
  console.log(req)
  Blog.findByIdAndUpdate(req.params.postId, { $inc: { likes: 1 } }, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
})


app.post("/", (req, res) => {
  console.log(req.body)
  Blog.create(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
});

app.delete("/delete/:postId", (req, res) => Blog.deleteOne({ _id: req.params.postId }).then((response) => res.json(response)))

app.listen(5000, () => console.log("Listening on port 5000"));