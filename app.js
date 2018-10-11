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
  let qString = req.query.tag;
  let context = '';
  // get context to array of artwork objects to be used as variable
  // in homepage.hbs (each artwork object will be its own li element)
  if (!qString) {
    // if no filter is chosen, reverse artwork array and
    // let every image be part of what to display
    artworkStrings.reverse();
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
  res.send('<form method="post" action="/add"><input type="text" name="title" value="title"><input type="text" name="dt" value="dt"><input type="text" name="artwork" value="artwork"><input type="text" name="tags" value="tags"><input type="submit" value="add artwork"></form>');
});

app.post('/add', (req, res) => {
  // add new pieces of art work to array
  artworkStrings.push({title: req.body.title, date: req.body.dt, artwork: req.body.artwork, tags: req.body.tags});
  // redirect back to homepage
  res.redirect('/');
});

// connect on port 3000
app.listen(3000);
