const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const UserRouter = require('./routers/userRouter')
const ImageRouter = require('./routers/imageRouter');
const CommentRouter = require('./routers/commentRouter');

mongoose.connect("mongodb://localhost/techkids-hotgirl")

app.use(bodyParser.urlencoded({ extended: true }
));
app.use(bodyParser.json());

app.use("/api/users", UserRouter);
app.use("/api/images", ImageRouter);
app.use("/api/comments", CommentRouter);

// Middleware
UserRouter.use((req, res, next) => {
    console.log("404");
    res.send("404");
});

const port = 1110;

app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at port 1110')
});