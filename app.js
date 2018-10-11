// app.js

// require express and path, and make an express app
const express = require('express');
const path = require('path');
const app = express();

// array of artwork objects to be displayed in reverse order
let artworkStrings = [
  {title: "washington sq arch", date: "2018-09-29", artwork: ` _______________\n |~|_________|~|\n |::::\\^o^/::::|\n ---------------\n |..|/     \\|..| \n ---        ----\n |  |       |  |\n |  |       |  |\n |  |       |  |\n.|__|.     .|__|.`, tags: ['architecture', 'public']}, {title: "boba", date: "2018-09-30", artwork: "   ______" + `
  ======\n
 /      \\n
|        |-.\n
|        |  \\n
|O.o:.o8o|_ /\n
|.o.8o.O.|\n
 \.o:o.o/`, tags: ['snack', 'notmybestwork']}, {title: "buddy", date: "2018-10-31", artwork: "testing", tags: ['halloween', 'squad', 'fashion']}];
 artworkStrings.reverse();

// set up handlebars
app.set('view engine', 'hbs');

// set middleware to serve static content
const fullPath = path.join(__dirname, 'public');
app.use(express.static(fullPath));

// set body parsing middleware
app.use(express.urlencoded({extended: false}));

// custom middleware to log request method, path, query string, and body
app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log('query string:\n', req.query, '\n');
  console.log('body:\n', req.body, '\n');
  next();
});

// homepage
app.get('/', (req, res) => {
  // get context to array of artwork objects to be used as variable
  // in homepage.hbs (each artwork object will be its own li element)
  const context = {artWork: artworkStrings};
  res.render('homepage', context);
});

// connect on port 3000
app.listen(3000);
