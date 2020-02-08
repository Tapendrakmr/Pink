const functions = require("firebase-functions");
const app = require("express")();
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/user/newUser", (req, res) => {
  const User = {
    name: req.body.name,
    interest: req.body.interest,
    skills: req.body.skills,
    hobbies: req.body.hobbies,
    age: req.body.age,
    email: req.body.email
  };
  db.doc(`/user/${User.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "Account is already exist" });
      }
      return db.doc(`/user/${User.email}`).set(User);
    })
    .then(() => {
      return res.status(201).json({ message: "Added" });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        general: "Something went wrong, please try again",
        error: err
      });
    });
});

app.get("/user", (req, res) => {
  db.collection("user")
    .get()
    .then(data => {
      let users = [];
      data.forEach(doc => {
        users.push({
          userid: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          interest: doc.data().interest,
          skills: doc.data().skills,
          hobbies: doc.data().hobbies,
          age: doc.data().age
        });
      });
      return res.json(users);
    })
    .catch(err => {
      res.json("error" + err);
    });
});

app.get("/user/:email", (req, res) => {
  let user = [];
  db.doc(`/user/${req.params.email}`)
    .get()
    .then(data => {
      if (!data.exists) {
        return res.json("user doesn't exist");
      }
      user = data.data();
      user.userid = data.id;

      return res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});
exports.api = functions.https.onRequest(app);
