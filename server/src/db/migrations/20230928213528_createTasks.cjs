/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("tasks", (table) => {
        table.bigIncrements("id")
        table.string("task").notNullable()
        table.string("description")
        table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
        table.bigInteger("toDoListId").notNullable().unsigned().index().references("toDoLists.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("tasks")
}
