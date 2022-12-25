const express = require("express");
const { db } = require("../models/userData");
const router = express.Router();
const dbData = require("../models/userData");
const dbImg = require("../models/userImg");

router.get("/login", async function (req, res) {
  let q = req.query;
  const tmp = await dbData.findOne({
    username: q.username,
    password: q.password,
  });
  // console.log(tmp._id);
  if (tmp) {
    await dbData.findOne({
      username: q.username,
      password: q.password,
    });
    res.send(tmp.id);
  } else res.send("");
});

router.post("/signUp", async function (req, res) {
  //console.log(req.body);
  console.log("Sign Up now...");
  const q = req.body;
  let tmp = await dbData.findOne({
    username: q.username,
  });
  //if username not exist
  if (!tmp) {
    await dbData.collection.insertOne(
      {
        username: q.username,
        password: q.password,
        backgroundURL: "",
        tasks: "",
        star: false,
        firework: false,
        downStar: false,
        rippleRound: false,
        ring: false,
        backgroundSize: "auto",
      },
      function (err, res) {
        if (err) throw err;
        console.log("Sign Up Success");
      }
    );

    res.send("ok");
  } else {
    console.log("Sign Up lost");
    res.send("fail");
  }
});
router.get(/check/, async function (req, res) {
  let q = req.query;
  let tmp = await dbData.findOne({ _id: q.myid });
  if (!tmp) res.send("");
  else res.send(tmp);
});

router.post(/refresh/, async function (req, res) {
  let q = req.body;
  //console.log(q.myid);
  await dbData.updateOne(
    { _id: q.myid },
    {
      $set: {
        tasks: q.tasks,
        backgroundURL: q.backgroundURL,
        star: q.star,
        firework: q.firework,
        downStar: q.downStar,
        ring: q.ring,
        rippleRound: q.rippleRound,
        backgroundSize: q.backgroundSize,
      },
    }
  );

  console.log("update success");
  res.send("Done");
});

router.post(/uploadImg/, async function (req, res) {
  let q = req.body;
  await dbImg.collection.insertOne({
    userId: q.myid,
    imgURL: q.url,
  });
  console.log("Image insert success");
  res.send("ok");
});
router.get(/getImg/, async function (req, res) {
  let q = req.query;
  const tmp = await dbImg.collection.find({ userId: q.myid }).toArray();

  if (tmp) {
    res.send(tmp);
  } else res.send("nothing");
});

module.exports = router;
