import express from "express";
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { User, ToDoList } from "../../../models/index.js";

const toDoListsRouter = new express.Router();

toDoListsRouter.get("/", async (req, res) => {
    try {
        const toDoLists = await ToDoList.query()
        return res.status(200).json({ toDoLists: toDoLists})
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

toDoListsRouter.post("/", async (req, res) => {
    const { name, description } = req.body
    const { id } = req.user
    try {
        const postingUser = await User.query().findById(id)
        const cleanToDoList = cleanUserInput({ name, description })
        const newToDoList = await postingUser.$relatedQuery("toDoLists").insertAndFetch(cleanToDoList)

        return res.status(201).json({ toDoLists: newToDoList})
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error})
        } else {
            return res.status(500).json({ errors: error})
        }
    }
})

toDoListsRouter.get('/:id', async (req, res) => {
    const toDoListId = req.params.id
    try {
        const showToDoList = await ToDoList.query().findById(toDoListId)
        return res.status(200).json( { toDoList: showToDoList })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default toDoListsRouter