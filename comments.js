// Create web server
// Run: node comments.js
// Test: curl -i http://localhost:3000/comments
// Test: curl -i http://localhost:3000/comments/1
// Test: curl -i -X POST -H 'Content-Type: application/json' -d '{"body": "This is a comment"}' http://localhost:3000/comments
// Test: curl -i -X PUT -H 'Content-Type: application/json' -d '{"body": "This is a comment"}' http://localhost:3000/comments/1
// Test: curl -i -X DELETE http://localhost:3000/comments/1

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

// Create comments array
var comments = [
  { id: 1, body: 'This is a comment' },
  { id: 2, body: 'This is another comment' }
];

// Create id counter
var idCounter = comments.length;

// Configure app to use body-parser
app.use(bodyParser.json());

// Create routes
app.route('/comments')
  // GET request
  .get(function(req, res) {
    res.json(comments);
  })
  // POST request
  .post(function(req, res) {
    var comment = req.body;
    comment.id = ++idCounter;
    comments.push(comment);
    res.json(comment);
  });

app.route('/comments/:id')
  // GET request
  .get(function(req, res) {
    var id = req.params.id;
    res.json(comments[id - 1]);
  })
  // PUT request
  .put(function(req, res) {
    var id = req.params.id;
    var comment = req.body;
    comment.id = id;
    comments[id - 1] = comment;
    res.json(comment);
  })
  // DELETE request
  .delete(function(req, res) {
    var id = req.params.id;
    comments.splice(id - 1, 1);
    res.sendStatus(204);
  });

// Start server
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});