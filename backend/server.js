const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Assuming you have routes defined

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
