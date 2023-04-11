import app from "./express"
import client from "./src/database/database"
const port = process.env.PORT || 3000

const server = async()=>{
    const db = client.db().databaseName
    console.log('Database connection established',client?.db().databaseName)
    app.listen(port,()=>{
        console.log(`Server listening on ${port}`)
    })    
}
server()


