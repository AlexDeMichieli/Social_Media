const mongoose = require ('mongoose');
mongoose.set('useCreateIndex', true);
require('dotenv/config')

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false  }, 
            () =>
            console.log('connected to db'))

    } catch(err) {

        console.error(err.message);
        //exit process with failure
        process.exit(1)

    }

}

module.exports = connectDB