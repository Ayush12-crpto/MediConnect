import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("database connected"))
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,  // wait 30s before timing out
        tls: true,                         // force TLS (works on restricted networks)
        tlsAllowInvalidCertificates: false
    });
}
export default connectDB