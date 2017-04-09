var game
{
	questions : ["Which of these is not one of Isacc Asimov's 3 Laws of Robotics?",
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
				],
	possibleAnswers : 
	[
		["A robot may not injure a human being or, through inaction, allow a human being to come to harm",
			"A robot may not injure a human being, except in such a case as to prevent harm to come to another human being",
			"A robot must obey orders given it by human beings except where such orders would conflict with the First Law",
			"A robot must protect its own existence as long as such protection does not conflict with the First or Second Law"
		],
		["As Low As Reasonably Allowable", "As Long As Reliably Allowed",
		"As Low As Reasonably Achievable", "As Limited As Reasonably Achievable"],
		["Spiderman", "X-Men", "The Avengers", "Iron Man"],
		["Garnet", "Peridot", "Lapis Lazuli", "Holly Blue Agate"],
		["Aragorn", "Eowyn", "Saruman", "Faramir"],
		["Germany, Italy, and Russia", "Hungary, Germany, and Japan", "Germany, Italy, and Japan", "Germany, Austria-Hungary, and Turkey"],
		["Hawaii", "Alaska", "Arizona", "New Mexico"],
		["Russia", "Canada", "United States of America", "Australia"],
		["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Plato"],
		["200", "300", "400", "500"]
	],
	answers : 	["A robot may not injure a human being, except in such a case as to prevent harm to come to another human being",
					"As Low As Reasonably Achievable",
					"Iron Man", "Garnet","Aragorn",
					"Germany, Italy, and Japan", "Hawaii",
					"Canada", "Leonardo da Vinci", "200"
				],
	questionsNotAsked : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	questionIndex : -1,
	questionNumber : 0,
	numRight : 0,

	initialize : function()
	{
		game.numRight = 0;
		game.questionNumber = 0;
		game.questionsNotAsked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		game.nextQuestion();		
	},

	checkAnswer : function(answer)
	{
		// if the answer is correct
		if(answer == game.answers[game.questionIndex])
		{
			// increase score
			numRight++;
		}
	},

	nextQuestion : function()
	{
		// find a question to ask
		game.questionIndex = Math.floor(Math.random() * game.questions.length);
		console.log(game.questionIndex);

		// set up the question based on the index
		$("#question").html(game.questions[game.questionIndex]);

		// and the answers
		var answerSlots = $(".answers");
		for(var i = 0; i < game.possibleAnswers[game.questionIndex].length; i++)
		{
			answerSlots[i].html(game.possibleAnswers[game.questionIndex][i]);
		}


		// once it has been set up, remove it from the list of possible questions
		game.questionsNotAsked.splice(game.questionIndex, 1);
	},

	updateScreen : function()
	{

	},
};

function Start()
{
	game.initialize();
}

$(".answers").click(onClickEvent);

function onClickEvent(event)
{
	console.log(event.data);
}