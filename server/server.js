const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
// const moment = require("moment");


// SOCKETS
const http = require("http");
const SocketIOServer = require("socket.io");
const server = http.createServer(app);
const io = SocketIOServer(server, {
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:3000"));
    },
});

/*************************** REQUIRE ROUTERS ***************************/

const auth = require("./routers/auth-router");
const projects = require("./routers/projects-router");


/*************************** SECRET ***************************/

let secret =
    process.env.COOKIE_SECRET || require("./secrets.json").COOKIE_SECRET;
let socketSecret =
    process.env.COOKIE_SECRET || require("./secrets.json").SOCKET_COOKIE_SECRET;

/*************************** MIDDLEWARE ***************************/

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: secret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: socketSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.json());

/*************************** ROUTERS ***************************/

app.use(auth);
app.use(projects);


// ************************* SOCKET ******************************

io.on("connection", (socket) => {
    const userId = socket.request.session.userId;
    console.log(
        `user with the ${socket.id} and the UserId: ${userId} connected`
    );
    // if (!socket.request.session.userId) {
    //     return socket.disconnect(true);
    // }
});

// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
