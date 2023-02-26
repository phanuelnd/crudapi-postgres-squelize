const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };

  app.use(cors(corsOptions));
  // app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({extended:true}))

// sync method in server.js 
  const db = require("./app/models");
  db.sequelize.sync()

    db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    });

  app.get("/", (req, res) => {
    res.json({message: "Welcome to the CRUD Application"});
});
//setting routes in the server .js
require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}.`);
});








