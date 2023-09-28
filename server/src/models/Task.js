const Model = require("./Model")

class Task extends Model {
    static get tableName() {
        return "tasks"
    }

    static get relationMappings() {
        const { ToDoList } = require("./index.js")

        return {
            toDoList: {
                relation: Model.BelongsToOneRelation,
                modelClass: ToDoList,
                join: {
                    from: "tasks.toDoListId",
                    to: "toDoLists.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["task"],
            properties: {
                task: { type: "string" },
                description: { type: "string"}
            }
        }
    }
}

module.exports = Task