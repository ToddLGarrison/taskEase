import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                username: "bilbo",
                email: "bilbo@baggins.com",
                password: "1ring",
            },
            {
                username: "Geralt",
                email: "g-money@email.com",
                password: "roach",
            },
            {
                username: "Tilly",
                email: "tilly@email.com",
                password: "ziggy",
            },
            {
                username: "Ziggy",
                email: "ziggy@email.com",
                password: "tilly",
            },
            {
                username: "Cinder",
                email: "cinder@email.com",
                password: "1234",
            }
        ]
        for (const singleUserData of userData) {
            const currentUser = await User.query().findOne({ email: singleUserData.email })
            if (!currentUser) {
                await User.query().insert(singleUserData)
            }
        }
    }
}

export default UserSeeder