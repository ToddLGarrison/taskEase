/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ToDoListSeeder from "./seeders/ToDoListSeeder.js"
import TaskSeeder from "./seeders/TaskSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding toDo Lists...")
    await ToDoListSeeder.seed()

    console.log("Seeding tasks...")
    await TaskSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder