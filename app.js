const express = require("express");
const app = express();

app.use(express.json());

const books = require("./books.json");

const authorize = (permission) => {
    return(req,res,next) =>{
        req.body = permission;
        console.log("middleware present")
        next();
    }
}

app.get("/",authorize('Gautam_H'),(req,res) => {
    const newBook = {};
    newBook.api_requested_by = req.body;
    newBook.books = books;
    console.log("Method:",req.method);
    res.send(newBook);
});

app.get("/:id",authorize('Gautam_H'),(req,res) => {
    const newBook = {};
    newBook.api_requested_by = req.body;
    newBook.books = books.filter((book) => book.id == req.params.id);
    console.log("Method:",req.method);
    res.send(newBook);
});

app.delete("/:id",(req,res) => {
    const newBook = books.filter((book) => book.id != req.params.id);
    console.log("Method:",req.method);
    res.send(newBook);
});

app.post("/",(req,res) => {
    const newBook = [...books,req.body];
    console.log("Method:",req.method);
    res.send(newBook);
});

app.patch("/:id",(req,res) => {
    const newBook = books.map((book) => {
        if(req.params.id == book.id){
          
            if(req?.body?.author) book.author = req.body.author;
            if(req?.body?.publish) book.publish = req.body.publish;
        }
        return book;
    });
    console.log("Method:",req.method);
    res.send(newBook);
})

app.listen(3456,() => {
    console.log("listening on port 3456");
})