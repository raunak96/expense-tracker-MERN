const mongoose = require('mongoose');

const connectToMongoose = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://rawn_user:${process.env.MONGO_URI}.mongodb.net/expense-tracker?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        );
        console.log(`DB Connected: ${conn.connection.host}`.cyan.bold);
    } catch (error) {
        console.log("DB error", error.message);
        process.exit(1); //for app to shut down
    }
};

module.exports=connectToMongoose;