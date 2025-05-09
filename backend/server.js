const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
require('./config/db');

const categoryRoutes = require('./app/routes/category.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
