import { User, ToDoList, Task } from "../../models/index.js";

class TaskSeeder {
    static async seed() {
        const bilbo = await User.query().findOne({ email: "bilbo@baggins.com" })
        const geralt = await User.query().findOne({ email: "g-money@email.com" })
        const tilly = await User.query().findOne({ email: "tilly@email.com" })
        const ziggy = await User.query().findOne({ email: "ziggy@email.com" })

        const hikingTrip = await ToDoList.query().findOne({ name: "Hiking Trip" })
        const dinnerParty = await ToDoList.query().findOne({ name: "Dinner Party" })
        const horseSupplies = await ToDoList.query().findOne({ name: "Horse supplies" })
        const cleaningList = await ToDoList.query().findOne({ name: "Cleaning list" })

        const taskData = [
            {
                name: "Buy food",
                description: "We need to eat",
                userId: bilbo.id,
                toDoListId: hikingTrip.id,
            },
            {
                name: "Clean house",
                description: "Kitchen is dirty",
                userId: geralt.id,
                toDoListId: dinnerParty.id,
            },
            {
                name: "Hay",
                description: "They're hungry",
                userId: tilly.id,
                toDoListId: horseSupplies.id,
            },
            {
                name: "bleach",
                description: "It'll clean ya out but leave you hollow inside",
                userId: ziggy.id,
                toDoListId: cleaningList.id
            },
        ]

        for (const singleTaskData of taskData) {
            const currentTask = await Task.query().findOne(singleTaskData)
            if (!currentTask) {
                await Task.query().insert(singleTaskData)
            }
        }
    }
}

export default TaskSeeder;
