const app = angular.module ("HangmanApp", [])
app.controller("GameController", ['$scope','$timeout', '$http', function($scope, $timeout, $http){

  $scope.incorrectLettersChosen = [];
  $scope.correctLettersChosen =  [];
  $scope.guesses = 10;
  $scope.displayWord = '';
  $scope.input = {
    letter: ''
  }
  $scope.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';



  // function to start the game
  function setGame(word, id){
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen =  [];
    $scope.guesses = 10;
    $scope.displayWord = word;
    $scope.id = id
  }


  function startNewGame(){
    $http.get('/hangman/word') // making a request
    .then(function(response) { // then sending response
      console.log(response.data)
      let word = response.data.displayWord;
      let id = response.data.id;
      setGame(word, id);
    })
  }


  $scope.sendGuess =function(letter){
    console.log(letter)
    let url = '/hangman/letter';
    let data = {
      letter: letter,
      id: $scope.id,
      displayWord: $scope.displayWord
    };
    let config= { headers: {'Content-Type': 'application/json'} };

    $http.post(url, JSON.stringify(data), config)
    .then(function (result) {
        console.log('Success');
        $scope.displayWord = result.data.displayWord;
        verifyLetter(result.data.isInWord, letter);
    }, function(error) {
        console.log('Error:');
    });

  }



  function verifyLetter(isInWord, letter){
    letter = letter.toLowerCase()
    if($scope.correctLettersChosen.indexOf(letter) !== -1 || $scope.incorrectLettersChosen.indexOf(letter) !== -1){
      return
    }
    let correct = isInWord;

    // update correct and incorrect letters to show what user has inputed
    if(correct){
      $scope.correctLettersChosen.push(letter);
    }else{
      // update guesses if incorrect letter is chosen
      $scope.guesses --;
      $scope.incorrectLettersChosen.push(letter);
    }
    $scope.input.letter = "";
    if($scope.guesses == 0){
      // restart game if lost
      $timeout(function () {
         startNewGame();
      }, 500);
    }
    // check to see if user has guessed all the letters correctly
    if($scope.displayWord.indexOf("_") == -1){
    // restart game if won
      $timeout(function () {
         startNewGame();
      }, 500);
    }
  }


  startNewGame();
}])
