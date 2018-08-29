const app = angular.module ("HangmanApp", [])
app.controller("GameController", ['$scope','$timeout', function($scope, $timeout){

  let words = ["rat","cat","bat","mat"];
  $scope.incorrectLettersChosen = [];
  $scope.correctLettersChosen =  [];
  $scope.guesses = 10;
  $scope.displayWord = '';
  $scope. input = {
    letter: ''
  }
  // function to generate a random word from words variable
  let selectRandomWord = function(){
    let index = Math.round(Math.random() * words.length);
    return words[index];
  }
  // function to start the game
  let newGame = function(){
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen =  [];
    $scope.guesses = 10;
    $scope.displayWord = '';

    selectedWord = selectRandomWord();
    console.log(selectedWord)
    let tempDisplayWord  = '';
    for (i = 0; i <selectedWord.length; i++){
      tempDisplayWord += '*';
      }
    $scope.displayWord = tempDisplayWord;
  }
  //function to see if user input letter is in selected word
  $scope.letterChosen = function(){
    for(i = 0; i < $scope.correctLettersChosen.length; i++){
      if($scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
        $scope.input.letter = "";
        return;
      }
    }
    for(i = 0; i < $scope.incorrectLettersChosen.length; i++){
      if($scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
        $scope.input.letter = "";
        return;
      }
    }
    // logic for allowing *** word to be updated with letter if correct letter is chosen. ex. input = a, ***(cat) -> *a*
    let correct = false;
    for (i = 0; i < selectedWord.length; i++) {
      if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
        $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i + 1);
        correct = true;
      }
    }
    // update correct and incorrect letters to show what user has inputed
    if(correct){
      $scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
    }else{
      // update guesses if incorrect letter is chosen
      $scope.guesses --;
      $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
    }
    $scope.input.letter = "";

    if($scope.guesses == 0){
      // restart game if lost
      $timeout(function () {
         newGame();
      }, 500);
    }
    // check to see if user has guessed all the letters correctly
    if($scope.displayWord.indexOf("*") == -1){
    // restart game if won
      $timeout(function () {
         newGame();
      }, 500);
    }
  }
  newGame();
}])
