var bdApp = angular.module('drnovGalleryApp', ['ngTouch']);

bdApp.directive('imageSlider', function () {
	return {
		replace: true,
		scope: {
			images: "=",
			alts: "="
		},
		templateUrl: './js/imageSlider.html',
		link: function(scope, el, attrs) {
			scope.selectedImg = 0;

			scope.init = function () {
				scope.imgs = [];
				$.each(scope.images, function (k,v) {
					scope.imgs.push({ src: v, visible: (k == scope.selectedImg ? true : false), alt: scope.alts[k] });
				});
			}

			scope.next = function () {
				if (scope.selectedImg < scope.images.length - 1) scope.selectedImg++;
				scope.init();
			}

			scope.prev = function () {
				if (scope.selectedImg > 0) scope.selectedImg--;
				scope.init();
			}

			scope.init();
		}
	};
});


bdApp.directive('nearestDate', ['$http', '$timeout', function ($http, $timeout) {
	return {
		templateUrl: './js/nearestDate.html',
		link: function(scope, el, attrs) {
			scope.available = true;
			scope.loaded = false;
			scope.error = false;

			$http.get("/reservation/app/index.php/dates").success(function (dates) {
				scope.loaded = true;
				if (!dates.length) {
					el[0].style.display = 'none';
					return scope.available = false;
				}
				scope.available = true;
				scope.date = dates[0];
				scope.date.times = [];

				dates.forEach(function (item, key) {
					scope.loaded = true
					if (item.day == scope.date.day && item.month == scope.date.month) {
						scope.date.times.push(item.time);
					}
				});
				$timeout(function () {
					smooth(); //enable smooth scrolling from this link
				}, 500);
			}).error(function () {
				el[0].style.display = 'none';
			});
		}
	};
}]);

bdApp.controller('drnCtrl', ['$scope', function($scope) {
	$scope.demo = 'test';
}]);

bdApp.filter('join', function () {
	return function (input) {
		if (typeof input === 'undefined' || !input.length)
			return input;
		return input.join(", ");
	};
});