require('dotenv').config()
const express = require('express')
const usersRoutes = require('./routes/users.js')
const app = express()
const middlewareLogRequest = require('./middleware/logs.js')
const PORT = process.env.PORT || 5000;
const upload = require('./middleware/mutler.js')



app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));
app.use('/users', usersRoutes);
app.post('/upload',upload, (req, res) => {
    res.json({
        message: 'upload success',
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

