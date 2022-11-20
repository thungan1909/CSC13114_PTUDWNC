require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// enable cors
app.use(cors());      // ngoài lề

require('./middlewares/passport')(app);

app.use('/', require("./routes/routes"));       // 5.1

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
})