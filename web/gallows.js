app.directive('hgHangmanImage', [function() {
	return {
		restrict: 'E',
		scope: {
			incorrectCount: '@'
		},
		//Directive for displaying hangman image dynamically basis wrong guess count
		link: function(scope, element, attrs, controllers){
    		var hangmanMapping = {
	    		0: '',
	    		1: 'images/hangman-0.png',
	    		2: 'images/hangman-1.png',
	    		3: 'images/hangman-2.png',
	    		4: 'images/hangman-3.png',
	    		5: 'images/hangman-4.png',
	    		6: 'images/hangman-5.png',
	    		7: 'images/hangman-6.png',
	    		8: 'images/hangman-7.png',
	    		9: 'images/hangman-8.png',
	    		10: 'images/hangman-9.png',
	    	};


	    	scope.hangmanSrc = hangmanMapping[scope.incorrectCount]

	    	//Hook for the digest loop
	    	scope.$watch(
	    		function (scope) {
	    			return scope.incorrectCount
	    		},
	    		function(value) {
					scope.hangmanSrc = hangmanMapping[scope.incorrectCount]
		    	}
		    );
      	},
		template: '<img ng-show="hangmanSrc" src="{{hangmanSrc}}" />'
	};
}]);
