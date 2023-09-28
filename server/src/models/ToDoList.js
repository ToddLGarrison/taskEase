const Model = require("./Model.js")

class ToDoList extends Model {
    static get tableName() {
        return "todoLists";
    }

    static get relationshipMappings() {
        const { User, Task } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "toDoLists.userId",
                    to: "users.id"
                }
            },
            tasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: "toDoLists.id",
                    to: "tasks.toDoList.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
                description: { type: "string" }
            }
        }
    }
}

module.exports = ToDoList