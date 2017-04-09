var questions = ["Which of these is not one of Isacc Asimov's 3 Laws of Robotics?",
		"The current philosophy in regards to radiation exposure has been maintaining exposure ALARA. " +
		"What does ALARA stand for?",
		"What was the first movie in the Marvel Cinematic Universe?",
		"In the show Steven Universe, which of these characters is a member of The Crystal Gems?",
		"In the book, The Return of the King by J.R.R. Tolkien, who is crowned the King of Gondor?",
		"Who were the first three countries to sign the Tripartite Pact in World War II?",
		"What was the 50th state to become part of the United States of America?",
		"What is the largest single-continent country in the world?",
		"The Mona Lisa was painted by which artist?",
		"How many laps are in the Daytona 500?"
				];
var possibleAnswers = 
	[
		["A robot may not injure a human being or, through inaction, allow a human being to come to harm",
			"A robot may not injure a human being, except in such a case as to prevent harm to come to another human being",
			"A robot must obey orders given it by human beings except where such orders would conflict with the First Law",
			"A robot must protect its own existence as long as such protection does not conflict with the First or Second Law"
		],
		["All Ladies Are Righteously Awesome", "As Long As Reliably Allowed",
		"As Low As Reasonably Achievable", "As Limited As Ridiculously Achievable"],
		["Spiderman", "X-Men", "The Avengers", "Iron Man"],
		["Garnet", "Peridot", "Lapis Lazuli", "Holly Blue Agate"],
		["Aragorn", "Eowyn", "Saruman", "Faramir"],
		["Germany, Italy, and Russia", "Hungary, Germany, and Japan", "Germany, Italy, and Japan", "Germany, Austria-Hungary, and Turkey"],
		["Alaska", "Arizona", "New Mexico", "Hawaii"],
		["Russia", "Canada", "United States of America", "Australia"],
		["Vincent van Gogh", "Pablo Picasso","Leonardo da Vinci",  "Plato"],
		["200", "300", "400", "500"]
	];

var answers = ["A robot may not injure a human being, except in such a case as to prevent harm to come to another human being",
					"As Low As Reasonably Achievable",
					"Iron Man", "Garnet","Aragorn",
					"Germany, Italy, and Japan", "Hawaii",
					"Canada", "Leonardo da Vinci", "200"
				];
var questionsNotAsked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var questionIndex = -1;
var questionNumber = 0;
var numRight = 0;
var guess;
var secondsRemaining = 15;
var timer;
var showingAnswer = false;

$(document).ready(function()
{
	$("#answer-1").click(function()
	{
		var guess = document.getElementById("answer-1");
		checkAnswer(guess.children[0].textContent);
	});
	$("#answer-2").click(function()
	{
		var guess = document.getElementById("answer-2");
		checkAnswer(guess.children[0].textContent);
	});
	$("#answer-3").click(function()
	{
		var guess = document.getElementById("answer-3");
		checkAnswer(guess.children[0].textContent);
	});
	$("#answer-4").click(function()
	{
		var guess = document.getElementById("answer-4");
		checkAnswer(guess.children[0].textContent);
	});

	$("#results-block").hide();
});

function Initialize()
{
	numRight = 0;
	questionNumber = 0;
	questionsNotAsked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	secondsRemaining = 15;
	showingAnswer = false;
	$("#timer").show();
	$("#timer").html("Time Remaining: " + secondsRemaining.toString());
	$("#start-btn").hide();
	$("#results-block").hide();
	$("#question-block").show();
	timer = setTimeout(decrementTimer, 1000);
	nextQuestion();		
}

function checkAnswer(answer)
{
	// if the answer is correct
	if(answer == answers[questionIndex])
	{
		// increase score
		numRight++;
		// and tell the player...
		showQuestionResults(true);
		return;
	}

	// ...the results
	showQuestionResults(false);
}

function nextQuestion()
{
	// if there are no more questions
	if(questionsNotAsked.length == 0)
	{
		clearTimeout(timer);
		goToResults();
		return;
	}

	// otherwise find a question to ask
	questionIndex = Math.floor(Math.random() * questions.length);
	while(questionsNotAsked.indexOf(questionIndex) == -1)
	{
		questionIndex = Math.floor(Math.random() * questions.length);
	}

	// set up the question based on the index
	$("#question").html("<h2>" + questions[questionIndex] + "</h2>");

	// and the answers
	for(var i = 0; i < possibleAnswers[questionIndex].length; i++)
	{
		var answerSlot = $("#answer-" + (i+1).toString());
		answerSlot.html("<h4>" + possibleAnswers[questionIndex][i] + "</h4>");
	}


	// once it has been set up, remove it from the list of possible questions
	var questionNotAskedIndex = questionsNotAsked.indexOf(questionIndex);
	questionsNotAsked.splice(questionNotAskedIndex, 1);
}

function decrementTimer()
{
	secondsRemaining--;

	if(secondsRemaining == 0 && !showingAnswer)
	{
		showQuestionResults(false);
		return;
	}

	$("#timer").html("Time Remaining: " + secondsRemaining.toString());
	timer = setTimeout(decrementTimer, 1000);
}

function decrementResultsTimer()
{
	secondsRemaining--;

	// if time's up
	if(secondsRemaining == 0)
	{
		
		$("#question-block").show();
		$("#results-block").hide();
		showingAnswer = false;
		nextQuestion();
		if(questionsNotAsked.length > 0)
		{
			$("#timer").show();
			resetTimer();
		}
	}

	else
		timer = setTimeout(decrementResultsTimer, 1000);
}

function resetTimer()
{
	secondsRemaining = 10;
	clearTimeout(timer);
	$("#timer").html("Time Remaining: " + secondsRemaining.toString());
	timer = setTimeout(decrementTimer, 1000);
}

function showQuestionResults(gotItRight)
{
	$("#timer").hide();
	$("#question-block").hide();
	$("#results-block").show();
	showingAnswer = true;

	// if they got the answer right
	if(gotItRight)
	{
		$("#results-body").html("Congratulations! You are correct.");
	}

	// otherwise
	else
	{
		$("#results-body").html((secondsRemaining == 0? "Time's up! ":"Incorrect! ") + "The correct answer is: " + answers[questionIndex]);
	}

	secondsRemaining = 3;
	clearTimeout(timer);
	timer = setTimeout(decrementResultsTimer, 1000);
}

function goToResults()
{
	// hide the questions
	$("#question-block").hide();
	// show the results
	$("#results-block").show();
	clearTimeout(timer);

	$("#results-body").html("Number Correct: " + numRight + "\tNumber Wrong: " + (questions.length - numRight));

	// show the start button again
	var startButton = $("#start-btn");
	startButton.html("Restart");
	startButton.show();
}