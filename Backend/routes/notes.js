const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("tag", "Enter the valid tag").isLength({ min: 3 }),
    body("description", "Enter the valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, tag, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Assuming fetchuser middleware sets user in req.user
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.json({ note });
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndDelete(
    req.params.id
  );
  res.json({ "Sucess":"Note has been deleted" , note:note });
});

module.exports = router;
