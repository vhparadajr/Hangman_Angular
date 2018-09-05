const express = require ("express")
const bodyParser = require("body-parser")
const app = express()
const uuidv4 = require('uuid/v4');

let port = 7000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("web"))


app.listen(port)
console.log(`app listening on ${port}`)



//logic
let words = ["arthur", "victor", "shatter", "backpack", "sebastian", "computer"];
let chosenWord = {};
// selectRandomWord: generates random word
function selectRandomWord(){
  let index = Math.floor(Math.random() * words.length);
  return words[index];
}

function checkIfLetterExists(letter, word) {
  // returns true or false
  if(word.indexOf(letter.toLowerCase()) > -1){
    console.log(`${letter} is in ${word}`)
    return true;
  }else{
    console.log(`${letter} is not in ${word}`)
    return false;
  }
}

function setSpaces(word){
  let tempDisplayWord  = '';
  for (i = 0; i < word.length; i++){
    tempDisplayWord += '_ ';
  }
  return tempDisplayWord
}

function updateSpaces(letter, word, displayWord){
  for (i = 0; i < word.length; i++) {
    if(word[i].toLowerCase() == letter.toLowerCase()){
      displayWord = displayWord.slice(0, i * 2) + letter.toLowerCase() + displayWord.slice((i * 2) + 1);
    }
  }
  return displayWord
}


// routes
app.get('/hangman/word', function(req,res){
  let random = selectRandomWord();
  let id = uuidv4()
  chosenWord[id] = random;
  res.send({
    displayWord: setSpaces(random),
    id: id

  })
})

app.post('/hangman/letter', function(req, res){
  console.log(req.body)
  console.log(req.body.letter)
  let doesLetterExist = checkIfLetterExists(req.body.letter, chosenWord[req.body.id]);
  res.send({
    isInWord: doesLetterExist,
    displayWord: updateSpaces(req.body.letter, chosenWord[req.body.id], req.body.displayWord)
  })
})
