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
		description: 'As you enter the hexagon, a librarian seated at a desk lifts his head. "A visitor," he murmurs, "how nice." He introduces himself as George Grapes. You notice he is blind.',
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

const outcomes = [
	{
		vindication: "Vindication",
		glory: "Glory",
		medoicrity: "Mediocrity",
		ignominy: "Ignominy",
		obscurity: "Obscurity",
	}
]

$('#floorplan').hexGridWidget(55, 11, 5, 'hexfield');

$('.game-text').text("The Library is composed of an endless number of hexagonal rooms. Each room holds hundreds of books. Most of the books contain gibberish. Your life’s work is to find the Library’s few coherent words, sentences, and pages.");

const $beginGame = () => {
	$('.game-window').hide();
	$('.room-image').hide();
	$('.night').hide();
}

$('#leaveBegin').on('click', () => {
	$beginGame();
})

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

//If you leave a room without staying, the css remains transparent

const roomInPlay = [];

$('#floorplan .hexfield').click(function (e) {
		$(this).css('fill', 'rgba(0,0,0,0.6)');
		$('#leaveBegin').text("Leave");
		$('#stay').show();
		$('.game-text').empty();
		roomInPlay.unshift(rooms.splice([Math.floor(Math.random() * rooms.length)]));
		$('.game-text').append(roomInPlay[0][0].description);
		$fadeInNight();
});

$('#leaveBegin').on('click', () => {
	$fadeOutGame();
})

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
})
