import express from "express";
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { User, ToDoList, Task } from "../../../models/index.js";
import tasksRouter from "./taskRouter.js"

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
            console.error(`Error in toDoListsRouter.post: ${error.message}`);
            return res.status(500).json({ errors: error})
        }
    }
})

toDoListsRouter.get('/:id', async (req, res) => {
    const toDoListId = req.params.id
    // console.log(`req`, req)
    try {
        const showToDoList = await ToDoList.query().findById(toDoListId)
        if(!showToDoList) {
            return res.status(404).json({ status: "ToDo List Not Found" })
        }
        const tasks = await showToDoList.$relatedQuery("tasks")
        showToDoList.tasks = tasks
        // console.log(`showToDoList`, toDoListId )
        return res.status(200).json( { toDoList: showToDoList })
    } catch (error) {
        console.error(`Error in toDoListsRouter.get/:id: ${error.message}`)
        return res.status(500).json({ errors: error })
    }
})

toDoListsRouter.patch("/:id", async (req, res) => {
    const { name, description } = req.body
    const { id } = req.user
    const toDoListId = req.params.id

    try {
        const toDoListToUpdate = await ToDoList.query().findById(toDoListId)
        if(!toDoListToUpdate) {
            return res.status(404).json({ status: "ToDo List Not Found" })
        }
        if(id === toDoListToUpdate.userId) {
            const cleanToDoList = cleanUserInput({ name, description })
            const updateToDoList = await ToDoList.query().patchAndFetchById(toDoListId, {
                name: cleanToDoList.name,
                description: cleanToDoList.description
            })
            return res.status(200).json({ toDoList: updateToDoList })
        } else {
            return res.status(404).json({ status: "Update Failed" })
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error })
        } else {
            console.error(`Error in toDoListsRouter.patch/:id: ${error.message}`)
            return res.status(500).json({ errors: error })
        }
    }
})

toDoListsRouter.delete("/:id", async (req, res) => {
    const { id } = req.user
    const toDoListId = req.params.id

    try {
        const toDoListToDelete = await ToDoList.query().findById(toDoListId)
        if(!toDoListToDelete) {
            return res.status(404).json({ status: "ToDo List Not Found" })
        }
        if (id === toDoListToDelete.userId) {
            await Task.query().delete().where("toDoListId", "=", toDoListId)
            await ToDoList.query().delete().where("id", "=", toDoListId)
            return res.status(200).json({ status: "ToDo List Deleted"})
        } else {
            return res.status(404).json({ status: "Error with Deleting"})
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        } else {
            console.error(`Error in toDoListsRouter.delete/:id: ${error.message}`)
            return res.status(500).json({ errors: error })
        }
    }
})

toDoListsRouter.use("/:id/tasks", tasksRouter)

export default toDoListsRouter