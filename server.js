// Required dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

// Instantiate Express
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");


let routes = require("./controllers/burgers_controller");

app.use('/', routes);
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
