import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
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