/*
File name: books.js
Author's name: Audrey Bernier Larose
Student ID: 301166198
Web App Name: Favourite Book List
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ OPERATION */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book - CREATE OPERATION
router.get('/details', (req, res, next) => {

     res.render('books/details', {title: 'Add Book', books: ''});

});

// POST process the Book Details page and create a new Book - CREATE OPERATION
router.post('/details', (req, res, next) => {
    //defining a new book object
     let newBook = book({
      "Title": req.body.title, 
      "Author": req.body.author,
      "Genre": req.body.genre,
      "Description": req.body.description,
      "Price": req.body.price
});

 book.create(newBook, (err, book) => {
  if(err)
  {
      console.log(err);
      res.end(err);
  }
  else
  {
      res.redirect('/books');
  }
 });
});

// GET the Book Details page in order to edit an existing Book - UPDATE OPERATION
router.get('/details/:id', (req, res, next) => {
//Getting the selected book's id
     let id = req.params.id; 
     book.findById(id, (err, books) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('books/details', {
                title: 'Edit Book',
                books: books
            });
        }
    });
});

// POST - process the information passed from the details form and update the document - UPDATE OPERATION
router.post('/details/:id', (req, res, next) => {
//Getting the selected book's id and updating the book object
     let id = req.params.id;
     let updatedBook = new book({
        "_id": id,
        "Title": req.body.title, 
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Description": req.body.description,
        "Price": req.body.price
     });
 
     book.updateOne({_id: id}, updatedBook, (err) =>
     {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');
        }
     });
});

// GET - process the delete by user id - DELETE OPERATION
router.get('/delete/:id', (req, res, next) => {
//Getting the selected book's id and removing the book object
     let id = req.params.id;
     book.remove({_id: id}, (err) => 
     {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');
        }
     })
});

module.exports = router;
