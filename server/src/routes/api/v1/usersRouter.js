import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const toDoLists = await req.user.$relatedQuery("toDoLists")
    return res.status(200).json({ user: req.user, toDoLists: toDoLists })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

usersRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ username, email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: errors.message });
  }
});

export default usersRouter;