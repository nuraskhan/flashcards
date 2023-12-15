const express = require('express');
const { connectToDb , getDb } = require('./db');
const {ObjectId} = require("mongodb");
const cors = require('cors');


const PORT = 3000;



const app = express();
app.use(cors());
app.use(express.json())
let db;

connectToDb((err)=>{
    if(!err){
        app.listen(PORT , (err)=>{
            err? console.log(err) : console.log(`Listening on port ${PORT}`);
        });
        db = getDb();
    }else{
        console.log("DB connection error")
    }
});

const handleError = (res, req)=>{
    res.status(500).json({error});
}

//get all flashcards
app.get('/flashcards' , (req,res)=>{
    const cards = [];
    db
        .collection('flashcards')
        .find() //cursor - hasNext , next , forEach
        .sort({user : 1})
        .forEach((card)=>cards.push(card))
        .then(()=>{
            res
                .status(200)
                .json(cards);
        })
        .catch(()=> handleError(res ," Something went wrong" ));
});

// get flashcards only for user
app.get('/flashcards/:user', (req, res) => {
    const cards = [];
    db
        .collection('flashcards')
        .find({ user: req.params.user })
        .forEach((card)=>cards.push(card))
        .then(()=>{
            res
                .status(200)
                .json(cards);
        })
        .catch(()=> handleError(res ," Something went wrong" ));
});

// delete flashcards by front
app.delete('/flashcards/:front' , (req,res)=>{
    if (typeof req.params.front === 'string' && req.params.front.trim() !== '') {
        db
            .collection('flashcards')
            .deleteOne({ front: req.params.front })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something went wrong"));
    } else {
        handleError(res, "Invalid front value");
    }

});


//add flashcard
app.post('/flashcards' , (req,res)=>{
    db
        .collection('flashcards')
        .insertOne(req.body)
        .then((result)=>{
            res
                .status(201)
                .json(result);
        })
        .catch(()=> handleError(res ," Something goes wrong" ));
});


// get element by email
app.get('/users/:email' , (req,res)=>{
    //mongoose.Types.ObjectId(req.params.id)
    if (typeof req.params.email === 'string' && req.params.email.trim() !== '') {
        db
            .collection('users')
            .findOne({ email: req.params.email })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something went wrong"));
    } else {
        handleError(res, "Invalid front value");
    }
});

// add to collection users
app.post('/users' , (req,res)=>{
    db
        .collection('users')
        .insertOne(req.body)
        .then((result)=>{
            res
                .status(201)
                .json(result);
        })
        .catch(()=> handleError(res ," Something goes wrong" ));
});

app.post('/sessions' , (req,res)=>{
    db
        .collection('sessions')
        .insertOne(req.body)
        .then((result)=>{
            res
                .status(201)
                .json(result);
        })
        .catch(()=> handleError(res ," Something goes wrong" ));
});

app.post('/sessions' , (req,res)=>{
    db
        .collection('sessions')
        .insertOne(req.body)
        .then((result)=>{
            res
                .status(201)
                .json(result);
        })
        .catch(()=> handleError(res ," Something goes wrong" ));
});

app.get('/sessions' , (req,res)=>{
    const sessions = [];
    db
        .collection('sessions')
        .find() //cursor - hasNext , next , forEach
        .forEach((session)=>sessions.push(session))
        .then(()=>{
            res
                .status(200)
                .json(sessions);
        })
        .catch(()=> handleError(res ," Something went wrong" ));
});

app.delete('/sessions' , (req,res)=>{
    db
        .collection('sessions')
        .deleteMany({})
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch(() => handleError(res, "Something went wrong"));


});
app.patch('/flashcards/:front', (req, res) =>{
    if (typeof req.params.front === 'string' && req.params.front.trim() !== '') {
        db
            .collection('flashcards')
            .updateOne({ front: req.params.front } , {$set:req.body})
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something went wrong"));
    } else {
        handleError(res, "Invalid front value");
    }
})