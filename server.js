const express = require('express')

const app = express();

const port = 5000;

console.log('abc')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});