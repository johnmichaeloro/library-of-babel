//Library of Babel

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

$('#floorplan').hexGridWidget(55, 11, 5, 'hexfield');
$('.game-window').hide();
$('.night').hide();
$('.room-image').hide();

const $fadeInGameWindow = () => {
	$('.game-window').fadeIn(1500);
}

const $fadeInRoom = () => {
	$('.room-image').show($fadeInGameWindow);
}

const $fadeInNight = () => {
	$('.night').show($fadeInRoom);
}

$('#floorplan .hexfield').click(function () {
	$fadeInNight();
});

$('.decision-btn').on('click', () => {
	$('.room-image').fadeOut(100);
	$('.game-window').fadeOut(100);
	$('.night').fadeOut(1000);
})
