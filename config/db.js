const mongoose = require ('mongoose')
require('dotenv/config')

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true,  useUnifiedTopology: true  }, 
            () =>
            console.log('connected to db'))

    } catch(err) {

        console.error(err.message);
        //exit process with failure
        process.exit(1)

    }

}

module.exports = connectDB