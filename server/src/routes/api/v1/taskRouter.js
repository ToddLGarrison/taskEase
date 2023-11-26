import express from 'express';
import objection from 'objection'
import { ValidationError } from 'objection';
import { Task } from '../../../models/index.js';
import TaskSerializer from '../../../serializers/TaskSerializer.js';
import cleanUserInput from '../../../services/cleanUserInput.js';

const taskRouter = new express.Router({ mergeParams: true });

taskRouter.get('/', async (req, res) => {
    const toDoListId = req.params.id

    try {
        const tasks = await Task.query().where("toDoListId", toDoListId)
        return res.status(200).json({ tasks })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

taskRouter.get('/:id', async (req, res) => {
    const taskId = req.params.id

    try {
        const task = await Task.query().findById(taskId)
        if(!task) {
            return res.status(404).json({ errors: error })
        }
        return res.status(200).json({ task })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

taskRouter.post('/', async (req, res) => {
    const body = cleanUserInput(req.body)
    const toDoListIdParams = re.params.id
    const user = req.user
    const taskDataWithId = {...body, toDoListId: toDoListIdParams, userId: user.id}

    try {
        const newTask = await Task.query().insertAndFetch(taskDataWithId)
        const taskSerialized = TaskSerializer.taskDetails(newTask)
        return res.status(201).json({ task: taskSerialized })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        }
        return res.status(500).json({ errors: error })
    }
})

export default taskRouter;