//Library of Babel JS

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

//Array of Room Objects

const originalRooms = [
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
		description: 'From its bookshelves to its desks and chairs, everything in this hexagon is built of red cedar. Small volumes bound in crimson leather line the walls. In the distance, you hear angry voices.',
		consequence: 'As you read one of the red books, the air around you shimmers. A mob of Purifiers rushes into the room, shaking their fists and shouting. You lift your hand and they fall to their knees, overcome by the power of the Crimson Hexagon.',
		words: 231,
		sentences: 73,
		pages: 18,
		years: 72,
		addWords: function() {
			score.words = this.words;
		},
		addSentences: function() {
			score.sentences = this.sentences;
		},
		addPages: function() {
			score.pages = this.pages;
		},
		addYears: function() {
			score.age = this.years;
		}
	},
	{
		description: 'You watch a teenage boy lower his head to reverently kiss a book. "This book is sacred," he tells you. "Please, teach me to read it."',
		consequence: 'You sit at a desk and take the thin volume from his hands. While showing him how to pronounce each letter, you realize the first page is in English. As you read on, you discover the book is about your life. After a few pages, it begins to describe your future.',
		words: 307,
		sentences: 125,
		pages: 24,
		years: 72,
		addWords: function() {
			score.words = this.words;
		},
		addSentences: function() {
			score.sentences = this.sentences;
		},
		addPages: function() {
			score.pages = this.pages;
		},
		addYears: function() {
			score.age = this.years;
		}
	},
	{
		description: 'A woman lifts a book above her head as she leads a congregation in prayer. You have heard of this sect. They worship books as gods, though none of them can read.',
		consequence: 'The congregation makes you read to them at each gathering. The books in this hexagon are particularly intelligible. You find several words and sentences, as well as an entire page on the trimming of baby hair.',
		words: Math.floor(Math.random() * 12) + 5,
		sentences: Math.floor(Math.random() * 7) + 3,
		pages: 1,
		years: Math.floor(Math.random() * 7) + 4,
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
		consequence: 'After many years, you leave this room in disgust. In all of its books, never once did the repeating characters form a coherent sentence. The closest they ever came was, “George Grapes lifted the mug to his lips, took a sip of the bitter coffee, and sighed with pleasurg.”',
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
		consequence: 'You find a single paragraph. "He watched the searcher read the paragraph. He clenched his hands, wishing he could clench them around the searcher’s neck. He stood only a few feet behind the searcher. He took a step forward."',
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
		description: '“I am the Book Man,” shouts a librarian. He gestures at the book he is reading. “You can become the Book Man, too.” His pupils are different sizes. One is so large it has eclipsed its iris, while the other is as small as a distant star.',
		consequence: 'You sit beside him and read from the book. A sense of joy fills you as you realize you are reading the perfect compendium of all books. Blessed with the total knowledge of the Library, you become the Book Man.',
		words: 534,
		sentences: 188,
		pages: 92,
		years: 72,
		addWords: function() {
			score.words = this.words;
		},
		addSentences: function() {
			score.sentences = this.sentences;
		},
		addPages: function() {
			score.pages = this.pages;
		},
		addYears: function() {
			score.age = this.years;
		}
	},
	{
		description: 'In this room, a mob of angry men and women rip books from the shelves and tear  pages from their spines. “Join us,” one of them commands you. “Together, we will destroy this blasphemous library!”',
		consequence: 'When the Purifiers discover you are a searcher, they take your catalog and throw it over the railing. To punish you for your crimes, they imprison you for ten years.',
		words: 0,
		sentences: 0,
		pages: 0,
		years: 10,
		addWords: function() {
			score.words = 0;
		},
		addSentences: function() {
			score.sentences = 0;
		},
		addPages: function() {
			score.pages = 0;
		},
		addYears: function() {
			score.age = score.age += this.years;
		}
	},
	{
		description: 'A woman descends the spiral staircase beside this hexagon. “I am a cryptographer,” she says. “I have discovered the secret code of this library. With my code, every line of gibberish can be transformed into the purest wisdom.”',
		consequence: "You spend seven years learning the cryptographer's secret code. Unfortunately, it only transforms the Library’s gibberish into the cryptographer’s gibberish.",
		words: 0,
		sentences: 0,
		pages: 0,
		years: 7,
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
		description: '“Get out,” an old woman snarls at you. “I have been looking for this hexagon my entire life. You will not steal its treasures from me!”',
		consequence: 'One night as you are sleeping, the old woman throws you over the railing. You fall several stories before you are caught in a net laid by a librarian who heard your cries. It takes several years for you to recover from your injuries.',
		words: 0,
		sentences: 0,
		pages: 0,
		years: Math.floor(Math.random() * 4) + 3,
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
		description: 'An old man has collapsed on the floor of this hexagon. He reaches for you, his hands trembling. “Please,” he begs, “throw me over the railing when I die.”',
		consequence: 'You promise to do so and in gratitude the old man gives you his catalog. When he dies, you throw his body over the railing.',
		words: Math.floor(Math.random() * 23) + 7,
		sentences: Math.floor(Math.random() * 15) + 4,
		pages: Math.floor(Math.random() * 5) +2,
		years: 0,
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
		description: 'While reading the books in this hexagon, you encounter two that appear identical. "But this is impossible," you cry. "No two books in the library are identical!"',
		consequence: "You spend eight years carefully examining the two books. When you finally realize your error, you groan. You mistook a punctuation mark on page 305 of the second book for a period. It took you eight years to realize it's a comma.",
		words: 0,
		sentences: 0,
		pages: 0,
		years: 8,
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
		description: 'This hexagon looks just like any other. In its center, a low railing surrounds a ventilation shaft. Four of its walls are lined with books. It is lit by two dim lamps.',
		consequence: 'You find as many words, sentences, and pages as you might expect. Finding them takes what you might call an average amount of time.',
		words: Math.floor(Math.random() * 10) + 4,
		sentences: Math.floor(Math.random() * 5) + 1,
		pages: Math.floor(Math.random() * 2),
		years: Math.floor(Math.random() * 7) + 3,
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
		blessing: "More searchers enter the hexagon. They all read the perfect compendium. They all enjoy the bliss of total knowledge.",
		vindication: "You have found your vindication, the volume that validates your searching, the book that reveals your future. You die happily, living on in the memory of your people as a legend.",
		glory: "With the power of the Crimson Hexagon at your command, you become the ruler of the Library. You live forever, knowing the contents of every book, worshipped by the Library's inhabitants as a living god.",
		medoicrity: "When you die, your friends and family gather to mourn you. Everyone agrees you lived a full life. Though they speak of your catalog with admiration, your work is forgotten in a generation.",
		ignominy: 'After your death, you become a cautionary tale other searchers tell one another. "Take care not to end up like that one," they say. "Take care not to spend your whole life searching, and find nothing."',
		obscurity: "Your body is tossed without ceremony over the railing of the hexagon in which you die. Your catalog becomes a small footnote in an obscure compendium.",
	}

const introText = "The Library is composed of an endless number of hexagonal rooms. Each room holds hundreds of books. Most of these books contain gibberish. Your life’s work is to find the Library’s few coherent words, sentences, and pages.";

let rooms = [];

let roomInPlay = [];

const newGame = () => {
	$('#floorplan').hexGridWidget(55, 11, 5, 'hexfield');
	rooms = originalRooms.splice(0);
	$('#stay').hide();
	$('.game-text').text(introText);
	score.showWords();
	score.showSentences();
	score.showPages();
	score.showAge();
}

newGame();

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

const endGame = () => {
	$('.game-text').empty();
	$('#stay').hide();
	$('#leaveBegin').text("Finish");
	$fadeInNight();
	let finalScore = ((score.words) + (score.sentences * 10) + (score.pages * 100));
		if(finalScore <= 500) {
			$('.game-text').append(outcomes.ignominy);
			$('#leaveBegin').on('click', () => {
					$fadeOutGame();
					location.reload(true);
			});
		} else if(finalScore > 500 && finalScore <= 1000) {
			$('.game-text').append(outcomes.obscurity);
			$('#leaveBegin').on('click', () => {
					$fadeOutGame();
					location.reload(true);
			});
		} else if(finalScore > 1000 && finalScore <= 2000) {
			$('.game-text').append(outcomes.medoicrity);
			$('#leaveBegin').on('click', () => {
					$fadeOutGame();
					location.reload(true);
			});
		} else if(finalScore > 2000 && finalScore <= 3000) {
			$('.game-text').append(outcomes.glory);
			$('#leaveBegin').on('click', () => {
					$fadeOutGame();
					location.reload(true);
			});
		} else if(finalScore > 3000 && finalScore <= 4000) {
			$('.game-text').append(outcomes.vindication);
			$('#leaveBegin').on('click', () => {
					$fadeOutGame();
					location.reload(true);
			});
		} else if(finalScore > 4000) {
			$('.game-text').append(outcomes.blessing);
			$('#leaveBegin').on('click', () => {
					$fadeOutGame();
					location.reload(true);
			});
		}
	}


$('#leaveBegin').on('click', () => {
	if(score.age >= 72 || rooms.length === 0) {
		roomInPlay = [];
		endGame();
	} else {
		roomInPlay = [];
		$fadeOutGame();
	}
})

$('#floorplan .hexfield').click(function (e) {
		$(this).css('fill', 'rgba(0,0,0,0.6)');
		$('#leaveBegin').text("Leave");
		$('#stay').show();
		$('.game-text').empty();
		roomInPlay.unshift(rooms.splice([Math.floor(Math.random() * rooms.length) + 0], 1));
		$('.game-text').append(roomInPlay[0][0].description);
		$fadeInNight();
		$(this).unbind('click');
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
