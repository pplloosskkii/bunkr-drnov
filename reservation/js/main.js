var bdReserveApp = angular.module('drnovReservationApp', ['ngAnimate']);

bdReserveApp.factory('Reservations', ['$http', '$q', function ($http, $q) {
	var path = './app/index.php/';
	return {
		fetch: function () {
			var deferred = $q.defer();
			$http.get(path + "dates").success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function () { deferred.reject(); });

			return deferred.promise;
		},

		fetchById: function (id) {
			var deferred = $q.defer();
			$http.get(path + "reservations?id=" + id).success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function () { deferred.reject(); });

			return deferred.promise;
		},

		put: function (data) {
			var deferred = $q.defer();
			$http.post(path + "reservations", data).success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function () { deferred.reject(); });
			return deferred.promise;
		},

		delete: function (data) {
			var deferred = $q.defer();
			$http.post(path + "delete-reservation", data).success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function () { deferred.reject(); });
			return deferred.promise;
		}
	};
}]);


bdReserveApp.controller('drnCtrl', ['Reservations', '$timeout', function(Reservations, $timeout) {
	scope = this;

	var init = function () {
		scope.dates = [];
		scope.reservation = {};
		scope.selectedDate = null;
		scope.reservationHash = null;
		scope.loaded = false;
		scope.reload();
	}

	var parseByDate = function (data) {
		var sortedByDate = { length: 0 };
		data.forEach(function (item) {
			var index = item.year + "-" + item.month + "-" + item.day;
			if (typeof sortedByDate[index] === 'undefined') sortedByDate[index] = [];
			sortedByDate[index].push(item);
			sortedByDate.length++;
		});
		//console.log(sortedByDate);
		return sortedByDate;
	}

	scope.reload = function () {
		scope.loaded = false;
		Reservations.fetch().then(function (data) {
			scope.dates = parseByDate(data);
			scope.loaded = true;
			if (!data.length) {
				scope.dates = [];
				return;
			}
			ga('send', 'event', 'Reservation', 'Listing loaded');
		});
	}

	scope.reserveAt = function (dateEntry) {
		if (!dateEntry || dateEntry.freeSlots == 0) { scope.selectedDate = null; return init(); }
		scope.reservation = { placesReserved: 1, dateId: dateEntry.id };
		scope.selectedDate = dateEntry;
		scope.reservationPending = false;
		scope.reservationDone = false;
		scope.reservationFailed = false;
		ga('send', 'event', 'Reservation', 'Date selected');
	}

	scope.places = function (val) {
		if (this.reservation.placesReserved) {
			var newReserved = this.reservation.placesReserved + val;
			if ((newReserved > this.selectedDate.freeSlots) || (newReserved <= 0))
				return;
			this.reservation.placesReserved = newReserved;
		}
	}

	scope.submitReservation = function () {
		scope.reservationFailed = false;
		scope.reservationDone = false;
		scope.reservationPending = true;
		scope.selectedDate = null;

		var reservation = angular.copy(scope.reservation);
		Reservations.put(reservation).then(function (data) {
			scope.reservation = null;
			scope.reservationDone = true;
			scope.reservationHash = data.hash;
			scope.reservationPending = false;
			scope.reservationFailed = false;
			ga('send', 'event', 'Reservation', 'Reservation successfull');
			$timeout(function () {
				scope.reload;
				scope.reservationDone = false;
			}, 10000);
		}, function () {
			ga('send', 'event', 'Reservation', 'Reservation failed');
			scope.reservationFailed = true;
			scope.reservationDone = false;
			scope.reservationPending = false;
		})
	}


	init();
}]);

bdReserveApp.controller('CancelReservationCtrl', ['Reservations', '$location', function(Reservations, $location) {
	scope = this;

	init = function () {
		ga('send', 'event', 'Reservation', 'Cancelation form shown');
		scope.isValidating = true;
		scope.isValid = false;
		scope.reservation = null;
		scope.id = $location.search()['id'];
		if (!scope.id) {
			scope.isValidating = false;
			scope.isValid = false;
			return;
		}

		Reservations.fetchById(scope.id).then(function (data) {
			scope.reservation = data;
			scope.isValidating = false;
			scope.isValid = true;
		}, function () {
			scope.isValidating = false;
			scope.isValid = false;
		})
	}


	scope.submitCancelReservation = function () {
		scope.reservationFailed = false;
		scope.reservationDone = false;

		var reservation = {
			'hash': scope.reservation.hash,
			'reason': scope.reservation.reason,
			'dateId': scope.reservation.date.id,
			'slots': scope.reservation.slots
		}
		//angular.copy(scope.reservation);

		Reservations.delete(reservation).then(function () {
			ga('send', 'event', 'Reservation', 'Cancelled successfully');
			scope.reservation = null;
			scope.reservationDone = true;
		}, function () {
			ga('send', 'event', 'Reservation', 'Cancelation failed');
			scope.reservationFailed = true;
		})
	}

	init();

}]);


