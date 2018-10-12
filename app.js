// app.js

// require express and path, and make an express app
const express = require('express');
const path = require('path');
const app = express();

// array of artwork objects to be displayed in reverse order
let artworkStrings = [
  {title: "washington sq arch", date: "2018-09-29", artwork:
  `  _______________
  |~|_________|~|
  |::::\\^o^/::::|
  ---------------
  |..|/     \\|..|
  ----       ----
  |  |       |  |
  |  |       |  |
  |  |       |  |
 .|__|.     .|__|.`, tags: ['architecture', 'public']},
 {title: "boba", date: "2018-09-30", artwork:
 `  ======
 /      \\
|        |-.
|        |  \\
|O.o:.o8o|_ /
|.o.8o.O.|
 \\.o:o.o/`, tags: ['snack', 'notmybestwork']},
 {title: "buddy", date: "2018-10-31", artwork:
  "      /  /\\   |---.\   \n      |__|/__ |---,\\\n      |  `   |=    `\n      |      /|\n      |  .--' |\n      |   |\\  |\n      |   | \\ |\n     /|   | | |\n    \\/    |  \\|\n___ /_____\\___|\\____", tags: ['halloween', 'squad', 'fashion']}];
 // reverse array so most recent art displays first
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
  // get query string from url
  let qString = req.query.tag;
  let context = '';

  // get context to array of artwork objects to be used as variable
  // in homepage.hbs (each artwork object will be its own li element)
  if (!qString) {
    // let every image be part of what to display
    context = {artWork: artworkStrings};
  }
  else {
    // if there is a query string for tag, filter the array
    // so that artwork with only the specified tag shows up
    context = {artWork: artworkStrings.filter(art => art.tags.includes(qString))};
  }

  // render homepage with the appropriate artwork
  res.render('homepage', context);
});

app.get('/add', (req, res) => {
  // add page has a form so that new pieces of art work can be added to array - each input has name that corresponds to artwork object properties
  res.render('add');
});

app.post('/add', (req, res) => {
  // add new pieces of art work to front of array
  artworkStrings.unshift({title: req.body.title, date: req.body.dt, artwork: req.body.artwork, tags: req.body.tags.split(' ')});
  // redirect back to homepage
  res.redirect('/');
});

// connect on port 3000
app.listen(3000);
