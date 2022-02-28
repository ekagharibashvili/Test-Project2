import express from "express";
import data from "./data/mock.json" assert { type: 'json' };
const app = express();

const PORT = 3000;

//Using the public folder at the root of the folder
app.use(express.static("public"));

//Using the images folder at the route /images
app.use("/images", express.static("images"));

//Using express.json and express.urlencodes
// app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//GET
app.get("/", (req, res) => {
  res.json(data);
});

//POST -express.json and express.urlencoded
app.post("/item", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//GET - redirect method
app.get("/redirect", (req, res) => {
  res.redirect("http://www.linkedin.com");
});

app
  .route("/class")
  .get((req, res) => {
    //res.send("Retrive");
    throw new Error("wdd")
  })
  .post((req, res) => {
    res.send("Create");
  })
  .put((req, res) => {
    res.send("Update");
  })
  .delete((req, res) => {
    res.send("Delete");
  });

//GET with next()
app.get(
  "/next",
  (req, res, next) => {
    console.log("The response will be sent by the next functio");
    next();
  },
  (req, res) => {
    res.send("I just set up a route with a second callback");
  }
);

//GET with Routing Parameters
app.get("/class/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = data.filter((student) => studentId === student.id);
  res.send(student);
});

//POST
app.post("/create", (req, res) => {
  res.send("This is a POST request at /create");
});

//PUT
app.put("/edit", (req, res) => {
  res.send("This is a PUT request at /edit");
});

//DELETE
app.delete("/delete", (req, res) => {
  res.send("This is a DELETE request at /delete");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is broken!')
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}!`);
});
