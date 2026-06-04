const app = require('./app');
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const seedAdmin = require('./config/seed');

const start = async () => {
    await connectDB();
    await seedAdmin();
    
    app.listen(port, () => {
        console.log(`Clipper API running on port ${port}`);
    });
}

start();