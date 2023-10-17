class TaskSerializer {
    static taskDetails(task) {
        const allowedAttributes = ['id', 'task', 'description']
        let serializedTask = {}
        for (const attribute of allowedAttributes) {
            serializedTask[attribute] = task[attribute]
        }
        return serializedTask
    }
}

export default TaskSerializer