const app = require('./src/app');
const PORT = process.env.PORT || 5000;
const connectDB = require('./src/Db/db');
// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});