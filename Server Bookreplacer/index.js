const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

let stats = require('./json/stats.json');
let books = require('./json/books.json');
let published = require('./json/books.json');
const { response } = require('express');


app.get("/stats", function(req, res) {
  res.json(stats);
});

app.get("/published", function(req, res) {
  res.json(published);
});

app.get("/search/:title", function(req, res) {
  
  let title = req.params.title;
  let search = "[";

  for( let i = 0; i < books.length; i++ ){
    if( books[i].title.toLowerCase().includes(title) ){
      search += JSON.stringify(books[i]);
      search += ",";
    }  
  }
  search = search.slice(0, -1);
  console.log(search);
  search += "]";

  search = JSON.parse(search);

  res.json(search);
});

app.get("/orders/:owner", function(req, res) {
  
  let owner = req.params.owner;
  let orders = "[";

  for( let i = 0; i < books.length; i++ ){
    if( books[i].owner.toLowerCase() === owner ){
      orders += JSON.stringify(books[i]);
      orders += ",";
    }  
  }
  orders = orders.slice(0, -1);
  orders += "]";

  orders = JSON.parse(orders);

  res.json(orders);
});

app.listen(port, function(){
  console.log("Listening on port 3000!")
});