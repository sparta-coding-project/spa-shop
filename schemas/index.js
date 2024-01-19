import mongoose from 'mongoose'
import "dotenv/config"

const connect = () => {
    mongoose
        .connect(
            `mongodb+srv://qgx99098:${process.env.DB_PW}@cluster0.4bguu3d.mongodb.net/?retryWrites=true&w=majority`,
            {
                "dbName": "spa_mall"
            }
        )
        .catch(error => console.error(error))
        .then(() => console.log(`Successfully connected to MongoDB. Connected to database: [spa_mall].`))
}

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection Error", error);
})

mongoose.connection.on('disconnect', () => {
    console.error('mongodb disconnected... reconnecting');
    connect()
})

export default connect;