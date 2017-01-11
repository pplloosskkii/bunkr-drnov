console.DEBUG=0;

var m, center, zavora, markerLayer, vlak, cyklovlak, parkoviste, zavreno1, zavreno2, mainMarker, secondaryMarker;

mainMarker = { url: './images/map-marker-large.png', anchor: { left: 25, bottom: 0 }};
secondaryMarker = { url: './images/map-marker-small.png' , anchor: { left: 17, bottom: 0 }};

var initMap = function () {
	center = SMap.Coords.fromWGS84(14.15969789, 50.22915920);
	zavora = SMap.Coords.fromWGS84(14.17271733, 50.23667235);
	cyklovlak = SMap.Coords.fromWGS84(14.15581942, 50.21832575);
	vlak = SMap.Coords.fromWGS84(14.18433666, 50.23057133);
	parkoviste = SMap.Coords.fromWGS84(14.160819056149876, 50.2292601153901);
	zavreno1 = SMap.Coords.fromWGS84(14.140841963406956, 50.227643752196755);
	zavreno2 = SMap.Coords.fromWGS84(14.164050447460568, 50.226206652927054);


	m = new SMap(JAK.gel("m"), center, 13);
	var l = m.addDefaultLayer(SMap.DEF_BASE).enable();
	m.addDefaultControls();
	m.addControl(new SMap.Control.Sync());

	markerLayer = new SMap.Layer.Marker();
	m.addLayer(markerLayer);
	markerLayer.enable();
}

var initBunkrMarker = function () {
	var markerBunkr = new SMap.Marker(m.getCenter(), null, mainMarker);
	var cardBunkr = new SMap.Card();
	cardBunkr.getHeader().innerHTML = "<strong>Bunkr Drnov</strong>";
	cardBunkr.getBody().innerHTML = "Návštěvnické centrum, toalety, občerstvení. Začátek prohlídek zde";
	markerBunkr.decorate(SMap.Marker.Feature.Card, cardBunkr);
	markerLayer.addMarker(markerBunkr);
}

var initZavoraMarker = function () {
	var markerZavora = new SMap.Marker(zavora, null, secondaryMarker);
	var card = new SMap.Card();
	card.getHeader().innerHTML = "<strong>Příjezdová komunikace</strong>";
	card.getBody().innerHTML = "Je otevřena hodinu před a hodinu po prohlídkách. Souřadnice: <a target=\"_blank\" href=\"https://www.google.com/maps?q=50.2366651,+14.17266369&num=1&t=h&vpsrc=0&ie=UTF8&z=15&iwloc=A\">50°14'11.994N, 14°10'21.589E</a><br><br><a href=\"images/zavora.jpg\" target=\"_blank\"><img style=\"width:250px;\" src=\"images/zavora-small.jpg\"></a>";
	markerZavora.decorate(SMap.Marker.Feature.Card, card);
	markerLayer.addMarker(markerZavora);
}

var initParkovisteMarker = function () {
	var markerParkoviste = new SMap.Marker(parkoviste, null, { url: '//api4.mapy.cz/img/api/marker/drop-blue.png' });
	var card = new SMap.Card();
	card.getHeader().innerHTML = "<strong>Parkoviště</strong>";
	card.getBody().innerHTML = "Kapacita 40 vozů. Parkování zdarma.";
	markerParkoviste.decorate(SMap.Marker.Feature.Card, card);
	markerLayer.addMarker(markerParkoviste);
}

var initZavrenoMarker = function () {
	var markerZavreno1 = new SMap.Marker(zavreno1, null, { url: './images/x.png', size: { x: 20, y:20 } });
	var card1 = new SMap.Card();
	card1.getHeader().innerHTML = "<strong>Tato komunikace k bunkru nevede</strong>";
	markerZavreno1.decorate(SMap.Marker.Feature.Card, card1);

	var markerZavreno2 = new SMap.Marker(zavreno2, null, { url: './images/x.png' });
	var card2 = new SMap.Card();
	card2.getHeader().innerHTML = "<strong>Tato komunikace k bunkru nevede</strong>";
	markerZavreno2.decorate(SMap.Marker.Feature.Card, card2);
	markerLayer.addMarker(markerZavreno1);
	markerLayer.addMarker(markerZavreno2);
}

var initCyklovlakMarker = function () {
	var markerCyklovlak = new SMap.Marker(cyklovlak, null, { url: '//api4.mapy.cz/img/api/marker/drop-blue.png' });
	var card = new SMap.Card();
	card.getHeader().innerHTML = "<strong>Zastávka <a target=\"_blank\" href=\"http://www.cd.cz/zazitky/kam-na-vylet/812-z-prahy-na-okor-a-do-slaneho-jezdi-cyklohracek?_s_icmp=zazitkydetail\">cyklovlaku</a> ČD - <a target=\"_blank\" href=\"http://www.idos.cz/vlaky/?t=Podlešín\">Podlešín</a></strong>";
	card.getBody().innerHTML = "Na kole nebo pěšky k Bunkru Drnov cca 5km";
	markerCyklovlak.decorate(SMap.Marker.Feature.Card, card);
	markerLayer.addMarker(markerCyklovlak);	
}

var initTrainMarker = function () {
	var markerTrain = new SMap.Marker(vlak, null, { url: '//api4.mapy.cz/img/api/marker/drop-blue.png' });
	var card = new SMap.Card();
	card.getHeader().innerHTML = "<strong>Zastávka vlaku ČD - <a target=\"_blank\" href=\"http://www.idos.cz/vlaky/?t=Zvoleněves\">Zvoleněves</a></strong>";
	card.getBody().innerHTML = "Pěšky k Bunkru Drnov cca 2,5km po státní silnici směr Drnov, Žižice";
	markerTrain.decorate(SMap.Marker.Feature.Card, card);
	markerLayer.addMarker(markerTrain);	
}

var initPath = function () {
	var pathLayer = new SMap.Layer.Geometry();
	m.addLayer(pathLayer);
	pathLayer.enable();

	var pathFromRoadPoints = [
		zavora,
		SMap.Coords.fromWGS84(14.17086124,50.23576651),
		SMap.Coords.fromWGS84(14.16588306,50.23162825),
		SMap.Coords.fromWGS84(14.16553974,50.23134000),
		SMap.Coords.fromWGS84(14.16519642,50.23061251),
		SMap.Coords.fromWGS84(14.16332960,50.22973400),
		SMap.Coords.fromWGS84(14.16159153,50.22925357),
		parkoviste
	];
	var options1 = {
		color: "#f00",
		width: 5
	};
	var pathFromRoad = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, pathFromRoadPoints, options1);
	pathLayer.addGeometry(pathFromRoad);
}

var initTrainPath = function () {
	var l2 = m.addDefaultLayer(SMap.DEF_TURIST).enable();
	var coords = [vlak, zavora];
	var route = new SMap.Route(coords, nalezeno);
}

var initCyklovlakPath = function () {
	var l2 = m.addDefaultLayer(SMap.DEF_TURIST).enable();
	var coords = [cyklovlak, zavora];
	var route = new SMap.Route(coords, nalezeno);
}

var nalezeno = function(route) {
	var vrstva = new SMap.Layer.Geometry();
	m.addLayer(vrstva).enable();

	var coords = route.getResults().geometry;
	var cz = m.computeCenterZoom(coords);
	m.setCenterZoom(cz[0], cz[1]);
	var g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
	vrstva.addGeometry(g);
}

var onDetectGeolocation = function (position) {
	if (position.coords.longitude && position.coords.latitude) {
		ga('send', 'event', 'Map', 'Geolocation success');
		var coords = [
			SMap.Coords.fromWGS84(position.coords.longitude, position.coords.latitude),
			zavora
		];
		var route = new SMap.Route(coords, nalezeno);
	}
}

var setMapBasic = function () {
	initMap();
	initBunkrMarker();
	initZavoraMarker();
}

var setMapNavigation = function () {
	ga('send', 'event', 'Map', 'Car');
	initMap();
	initZavoraMarker();	
	initZavrenoMarker();	
	initParkovisteMarker();	
	initBunkrMarker();
	initPath();
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onDetectGeolocation);
	}
}

var setMapTrain = function () {
	ga('send', 'event', 'Map', 'Train');
	initMap();
	initBunkrMarker();
	initTrainMarker();
	initPath();
	initTrainPath();
}

var setMapBicycle = function () {
	ga('send', 'event', 'Map', 'Bicycle');
	initMap();
	initBunkrMarker();
	initCyklovlakMarker();
	initPath();
	initCyklovlakPath();
}

setMapBasic();


var hideMapOverlay = function () { 
	document.getElementById('mo').style.display = 'none';
}