
if (document.querySelector('#YMapsID')) {
	YMaps.jQuery(function () {
		let map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
		map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
	})
}

