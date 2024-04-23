const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true,
            // useFindeAndModify: false
        });
        console.log('Base de datos online');
    } catch (error) {
        console.error(error);
        throw new Error('Error al conectar con la base de datos');
    }
}

module.exports = {
    dbConection
}