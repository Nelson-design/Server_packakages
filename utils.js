const mongoose = require("mongoose");

const ConnectToDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/my_database");
        console.log("connected to DB");
    } catch (err) {
        console.log(err);
        console.log("issues connecting to db " + err.message);
    }
};


// const AppStarter = function listenFunc() {
//     console.log("server started on port " + port);
//     ConnectToDB();
// };

const AppStarter = (port) => {
    console.log("server start port " + port);
    ConnectToDB();
};

module.exports = {
    ConnectToDB,
    AppStarter,
};

module.exports.ConnectToDB = ConnectToDB;