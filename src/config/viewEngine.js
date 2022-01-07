import express from 'express';

let configViewEngine = (app) => {
    // static để server biết chỉ được lấy data từ đâu
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    //đường link lấy view engine
    app.set("views","./src/views")
}

// export ra
module.exports = configViewEngine;