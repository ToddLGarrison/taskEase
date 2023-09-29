import { User, ToDoList } from "../../models/index.js";

class ToDoListSeeder {
    static async seed() {
        const bilbo = await User.query().findOne({ email: "bilbo@baggins.com" })
        const geralt = await User.query().findOne({ email: "g-money@email.com" })
        const tilly = await User.query().findOne({ email: "tilly@email.com" })
        const ziggy = await User.query().findOne({ email: "ziggy@email.com" })

        const toDoListsData = [
            {
                name: "Hiking trip",
                description: "Supplies for Misty Mountains",
                userId: bilbo.id
            },
            {
                name: "Dinner Party",
                description: "Items for the party",
                userId: bilbo.id
            },
            {
                name: "Horse supplies",
                description: "Stuff Roach needs",
                userId: geralt.id
            },
            {
                name: "Places to nap",
                description: "List of places I want to nap",
                userId: tilly.id
            },
            {
                name: "Cleaning list",
                description: "Where to clean",
                userId: ziggy.id
            }
        ]
        for (const singleToDoListData of toDoListsData) {
            const currentToDoList = await ToDoList.query().findOne(singleToDoListData)
            if (!currentToDoList) {
                await ToDoList.query().insert(singleToDoListData)
            }
        }
    }
}

export default ToDoListSeeder