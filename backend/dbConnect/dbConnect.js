import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Database connect successfully`)

        // try part end
    } catch (error) {
        console.log(`Error in dbConnection :- ${error}`)
    }
}