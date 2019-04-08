//Library of Babel

$('#leave').hide();

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

//End of HexGridWidget

//For the intro, I want the hexagon to be present with the intro text and a begin button.
//I need the intro text to be the default hexagon text.
//Once begin is clicked, the hexagon and night are hidden.
//The text and button need to be .removed
//Then, when a hexagon turns black after being clicked
//The hex and night mode appear again
//And game text is appended along with the stay and leave buttons
//The buttons are appended once
//The text is different each click
//
//<button class="decision-btn">Leave</button>

$('#floorplan').hexGridWidget(55, 11, 5, 'hexfield');

$('.game-text').text("The Library is composed of an endless number of hexagonal rooms. Each room holds hundreds of books. Most of these books contain gibberish. Your life’s work is to find the Library’s few coherent words, sentences, and pages.");

const $beginGame = () => {
	$('.game-window').hide();
	$('.room-image').hide();
	$('.night').hide();
}

$('#begin').on('click', () => {
	$beginGame();
})

const $fadeInGame = () => {
	$('.room-image').fadeIn(15);
	$('.game-window').fadeIn(15);
}

const $fadeInNight = () => {
	$('.night').fadeIn(250, $fadeInGame);
}

$('#floorplan .hexfield').click(function () {
	$('#stayBegin').text("Stay");
	$('#leave').show();
	$('.game-text').empty();
	$fadeInNight();
});

const $fadeOutGame = () => {
	$('.room-image').fadeOut(100);
	$('.game-window').fadeOut(100);
	$('.night').fadeOut(250);
}

$('.decision-btn').on('click', () => {
	$fadeOutGame();
})
