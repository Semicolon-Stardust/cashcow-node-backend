import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI as string)
.then((data) => {
    console.log(`Database connected Successfully to ${data.connection.host}`);
})
}


export default connectDatabase;