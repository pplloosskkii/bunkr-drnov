// subscribe analytics event
$('#subscribe-button').on("click", function(event) {
	ga('send', 'event', 'subscribe', 'click');
});

// static panel on the left side
var panel = function() {
	var panel = $('nav');
	var panelLinks = panel.find('.item a');
	var scrollLinks = panelLinks.map(function() {
		var href = $(this).attr("href");
		if (href.charAt(0) === "#" && href !== '#') {
			var item = $(href);
			if (item.length) { return item; }
		}
	});
	var lastId;
	var positionPanel = function() {
		var fromTop = $(this).scrollTop() + 50;
		var cur = scrollLinks.map(function() {
			if ($(this).offset().top < fromTop)
				return this;
		});
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
		if (lastId !== id) {
			lastId = id;
			panelLinks.removeClass("active").parent().end().filter("[href=#"+id+"]").addClass("active");
		}
	}
	$(window).scroll(positionPanel);
	positionPanel();
};

/* Enable smooth scrolling on anchors */
var smooth = function () {
	var readabilityOffset = 30;
	$('a[href^="#"]').bind('click.smoothscroll', function (e) {
		e.preventDefault();
		var target = this.hash;
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - readabilityOffset
		}, 1000, 'swing', function () {
			window.location.hash = target;
		});
	});
}


$( document ).ready(function () {
	panel();
	smooth();
});