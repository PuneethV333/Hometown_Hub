import app from "./app"
import connectDB from "./db/db"
import { connectRedis } from "./config/redis"
import { config } from "./config/data.config"




const PORT: number = Number(config.port)

const startServer = async () => {
    await connectDB();
    await connectRedis();
    
    app.listen(PORT,() => {
        console.log(`server running on ${PORT}`);
    })
}

startServer();