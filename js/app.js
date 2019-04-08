//Library of Babel

$('#stay').hide();

//What follows is the HexGridWidget I used to generate the gameboard. I was given permission to use this widget by my instructor, Ryan Fleharty.
$.fn.hexGridWidget = function (radius, columns, rows, cssClass) {
	'use strict';
	var createSVG = function (tag) {
		return $(document.createElementNS('http://www.w3.org/2000/svg', tag || 'svg'));
	};
	return $(this).each(function () {
		var element = $(this),
				hexClick = function () {
					var hex = $(this);
					element.trigger($.Event('hexclick', hex.data()));
				},
				height = Math.sqrt(3) / 2 * radius,
				svgParent = createSVG('svg').attr('tabindex', 1).appendTo(element).css({
					width: (1.5 * columns  +  0.5) * radius,
					height: (2 * rows  +  1) * height
				}),
				column, row, center,
				toPoint = function (dx, dy) {
					return Math.round(dx + center.x) + ',' + Math.round(dy + center.y);
				};
		for (row = 0; row < rows; row++) {
			for (column = 0; column < columns; column++) {
				center = {x:Math.round((1 + 1.5 * column) * radius), y: Math.round(height * (1 + row * 2 + (column % 2)))};
				createSVG('polygon').attr({
					points: [
						toPoint(-1 * radius / 2, -1 * height),
						toPoint(radius / 2, -1 * height),
						toPoint(radius, 0),
						toPoint(radius / 2, height),
						toPoint(-1 * radius / 2, height),
						toPoint(-1 * radius, 0)
					].join(' '),
					'class':cssClass,
					tabindex:1
				})
				.appendTo(svgParent).data({center:center, row:row, column:column}).on('click', hexClick).attr({'hex-row': row, 'hex-column': column});
			}
		}
	});
};

//End of hexGridWidget

//Score Object

const score = {
	words: 0,
	sentences: 0,
	pages: 0,
	age: 18,
	showWords: function() {
		$('#words').text("Words: " + this.words);
	},
	showSentences: function() {
		$('#sentences').text("Sentences: " + this.sentences);
	},
	showPages: function() {
		$('#pages').text("Pages: " + this.pages);
	},
	showAge: function() {
		$('#age').text("Age: " + this.age);
	}
}

score.showWords();
score.showSentences();
score.showPages();
score.showAge();

//Array of Room Objects

const rooms = [
	{
		description: 'As you enter this hexagon, a librarian seated at a desk lifts his head. "A visitor," he murmurs, "how nice." He introduces himself as George Grapes. You notice he is blind.',
		consequence: 'You spend several years discussing the mysteries of life with George. Is the library infinite? Does the Crimson Hexagon exist? When you finally bid him farewell, you realize how little you have read.',
		words: Math.floor(Math.random() * 2) + 1,
		sentences: 0,
		pages: 0,
		years: Math.floor(Math.random() * 9) + 4,
		addWords: function() {
			score.words = score.words += this.words;
		},
		addSentences: function() {
			score.sentences = score.sentences += this.sentences;
		},
		addPages: function() {
			score.pages = score.pages += this.pages;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
	{
		description: 'From its bookshelves to its desks and chairs, everything in this hexagon is built of red cedar. Small volumes bound in crimson leather line its walls. In the distance, you hear angry voices.',
		consequence: 'As you read one of the red books, the air around you shimmers. A mob of Purifiers rushes into the room, shaking their fists and shouting. You lift your hand and they fall to their knees, overcome by the power of the Crimson Hexagon.',
		words: Math.floor(Math.random() * 1000),
		sentences: Math.floor(Math.random() * 1000),
		pages: Math.floor(Math.random() * 1000),
		years: Math.floor(Math.random() + 54),
		addWords: function() {
			score.words = score.words += this.words;
		},
		addSentences: function() {
			score.sentences = score.sentences += this.sentences;
		},
		addPages: function() {
			score.pages = score.pages += this.pages;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
	{
		description: 'You watch a teenage boy lower his head to reverently kiss a book. "This book is sacred," he tells you. "Please, teach me to read it."',
		consequence: 'You sit at a desk and take the thin volume from his hands. While showing him how to pronounce each letter, you realize the first page is in English. As you read on, you discover the book is about your life. After a few pages, it begins to describe your future.',
		words: Math.floor(Math.random() * 1000),
		sentences: Math.floor(Math.random() * 1000),
		pages: Math.floor(Math.random() * 1000),
		years: Math.floor(Math.random() + 54),
		addWords: function() {
			score.words = score.words += this.words;
		},
		addSentences: function() {
			score.sentences = score.sentences += this.sentences;
		},
		addPages: function() {
			score.pages = score.pages += this.pages;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
	{
		description: 'A woman lifts a book above her head as she leads a congregation in prayer. You have heard of this sect. They worship books as gods, though none of them can read.',
		consequence: 'The congregation elects you head of their church. You read to them at each gathering. The books in this room are particularly intelligible. You find several words and sentences, as well as an entire page on the trimming of baby hair.',
		words: Math.floor(Math.random() * 12) + 5,
		sentences: Math.floor(Math.random() * 7) + 3,
		pages: 1,
		years: Math.floor(Math.random()),
		addWords: function() {
			score.words = score.words += this.words;
		},
		addSentences: function() {
			score.sentences = score.sentences += this.sentences;
		},
		addPages: function() {
			score.pages = score.pages += this.pages;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
	{
		description: 'You take a book from each shelf in this room and examine it. Every sentence you read contains exactly 100 characters. Though the number of times a given character appears is the same in each sentence, its order of appearance is different.',
		consequence: 'After many years, you depart this hexagon in disgust. In all its books, never once did the repeating characters form a coherent sentence. The closest they ever came was, “George Grapes lifted the mug to his lips, took a sip of the bitter coffee, and sighed with pleasurg.”',
		words: 18,
		sentences: 0,
		pages: 0,
		years: Math.floor(Math.random() * 10) + 3,
		addWords: function() {
			score.words = score.words += this.words;
		},
		addSentences: function() {
			score.sentences = score.sentences += this.sentences;
		},
		addPages: function() {
			score.pages = score.pages += this.pages;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
	{
		description: 'There is no one in this hexagon, and yet you feel as though you are being watched.',
		consequence: 'You find a single paragraph. "He watched the searcher read the paragraph. He clenched his hands, wishing he could clench them around the searcher’s neck. He stood only a few feet behind the searcher. He took a step forward." You leave this hexagon quickly.',
		words: 0,
		sentences: 4,
		pages: 0,
		years: Math.floor(Math.random() * 6) + 4,
		addWords: function() {
			score.words = score.words += this.words;
		},
		addSentences: function() {
			score.sentences = score.sentences += this.sentences;
		},
		addPages: function() {
			score.pages = score.pages += this.pages;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
	{
		description: '“I am the Book Man,” shouts a librarian. He gestures at the book he is reading. “You can become the Book Man too.” His pupils are different sizes. One is so large it has eclipsed its iris, while the other is as small as a distant star.',
		consequence: 'You sit beside him and read from the book. A sense of joy fills you as you realize you are reading the perfect compendium of all books. Blessed with the total knowledge of the Library, you become the Book Man.',
		words: Math.floor(Math.random() * 1000),
		sentences: Math.floor(Math.random() * 1000),
		pages: Math.floor(Math.random() * 1000),
		years: Math.floor(Math.random() + 54),
		addWords: function() {
			score.words = score.words += this.words;
		},
		addSentences: function() {
			score.sentences = score.sentences += this.sentences;
		},
		addPages: function() {
			score.pages = score.pages += this.pages;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
]

/**
//Room Object Template
{
	description: '',
	consequence: '',
	words: Math.floor(Math.random()),
	sentences: Math.floor(Math.random()),
	pages: Math.floor(Math.random()),
	years: Math.floor(Math.random()),
	addWords: function() {
		score.words = score.words += this.words;
	},
	addSentences: function() {
		score.sentences = score.sentences += this.sentences;
	},
	addPages: function() {
		score.pages = score.pages += this.pages;
	},
	addYears: function() {
		score.age = score.age += this.years;
	}
},
**/

//Array of Outcome Objects

const outcomes = {
		vindication: "Vindication",
		glory: "Glory",
		medoicrity: "Mediocrity",
		ignominy: "Ignominy",
		obscurity: "Obscurity",
	}

$('#floorplan').hexGridWidget(55, 11, 5, 'hexfield');

$('.game-text').text("The Library is composed of an endless number of hexagonal rooms. Each room holds hundreds of books. Most of the books contain gibberish. Your life’s work is to find the Library’s few coherent words, sentences, and pages.");

roomInPlay = [];

const $fadeInGame = () => {
	$('.room-image').fadeIn(15);
	$('.game-window').fadeIn(15);
}

const $fadeInNight = () => {
	$('.night').fadeIn(250, $fadeInGame);
}

const $fadeOutGame = () => {
	$('.room-image').fadeOut(100);
	$('.game-window').fadeOut(100);
	$('.night').fadeOut(250);
}

let finalScore = ((score.words) + (score.sentences * 10) + (score.pages * 100));

const endGame = () => {
	if(score.age >= 72) {
		$('.game-text').empty();
		
		if(finalScore <= 200) {
			$('.game-text').append(outcomes.obscurity);
		} else if(finalScore <= 500) {
			$('.game-text').append(outcomes.medoicrity);
		} else if(finalScore <= 1000) {
			$('.game-text').append(outcomes.medoicrity);
		}
	}
}

//If you leave a room without staying, the css remains transparent

$('#leaveBegin').on('click', () => {
	roomInPlay = [];
	endGame();
	$fadeOutGame();
})

$('#floorplan .hexfield').click(function (e) {
		$(this).css('fill', 'rgba(0,0,0,0.6)');
		$('#leaveBegin').text("Leave");
		$('#stay').show();
		$('.game-text').empty();
		roomInPlay.unshift(rooms.splice([Math.floor(Math.random() * rooms.length) + 0], 1));
		$('.game-text').append(roomInPlay[0][0].description);
		$fadeInNight();
});

$('#stay').on('click', () => {
	$('.game-text').empty();
	$('#stay').hide();
	$('.game-text').append(roomInPlay[0][0].consequence);
	roomInPlay[0][0].addWords();
	roomInPlay[0][0].addSentences();
	roomInPlay[0][0].addPages();
	roomInPlay[0][0].addYears();
	score.showWords();
	score.showSentences();
	score.showPages();
	score.showAge();
	roomInPlay = [];
})
