var map = L.map('map',{
  center: [40.817155,-73.922968],
  zoom: 14,
  // layers: [CensusTractsBaseLayer],
});

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Control that Shows CT Info on Hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Population % Change <br> Between ACS Survey Years <br> 2006 - 2010 & 2012 - 2016</h4>' +
  (props ? '<b>' + 'Census Tract' + props.CTLabel + '</b><br />' + props.Change + '% Change'
    : 'Hover Over a Census Tract');
};

info.addTo(map);

function getColor(Change) {
		return Change < 0 ? '#d7191c' :
				Change < 6  ? '#fdae61' :
				Change < 11  ? '#ffffbf' :
				Change < 21  ? '#a6d96a' :
        Change < 200 ? '#1a9641' :
							'#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.Change)
		};
	}

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var CensusTractsGeojson;

	function resetHighlight(e) {
		CensusTractsGeojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

CensusTractsGeojson = L.geoJson(StudyAreaCensusTracts, {
		style: style,
		onEachFeature: onEachFeature
}).addTo(map);
//
// var CensusTractsBaseLayer = CensusTractsGeojson

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),               ]
    grades = [0, 10, 20, 50, 100, 200, 500, 100],
    labels = [],
    from, to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);


var StudyAreaBoundary = L.geoJSON(StudyArea, {
    fillColor: "none",
    color: "#191d5b",
    weight: 3,
}).addTo(map);

var SubwayLines = L.geoJSON(BronxSubwayLines, {
    color: "BLACK",
    weight: 2,
}).addTo(map);

var SubwayPoints = {
    radius: 10,
    color: "BLACK",
    fillColor: "BLACK",
    weight: 1,
};

var SubwayStationPoints  = L.geoJSON(BronxSubwayStations, {
   pointToLayer: function (feature, latlng) {
     var marker = L.circleMarker(latlng, SubwayPoints)
     // need to find a way to make space between name of station and line
         .bindPopup(feature.properties.name + "<br>" + feature.properties.line);
         marker.on('mouseover', function (e) {
             this.openPopup();
         });
         marker.on('mouseout', function (e) {
             this.closePopup();
         });

      return marker;
  }
}).addTo(map);

var OfficePoints = {
    radius: 10,
    opacity: 1,
    fillColor: "ORANGE",
    fillOpacity: 0.5,
    weight: .05,
};

var OfficeOverlay  = L.geoJSON(NewOfficeFloorArea, {
   pointToLayer: function (feature, latlng) {
     var marker = L.circleMarker(latlng, OfficePoints)
         .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
         marker.on('mouseover', function (e) {
             this.openPopup();
         });
         marker.on('mouseout', function (e) {
             this.closePopup();
         });

      return marker;
  }
 })

var ResidentialPoints = {
  radius: 10,
  opacity: 1,
  fillColor: "YELLOW",
  fillOpacity: 0.5,
  weight: .05,
};

var ResidentialOverlay = L.geoJSON(NewResidentialFloorArea, {
  pointToLayer: function (feature, latlng) {
    var marker = L.circleMarker(latlng, ResidentialPoints)
        .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });

     return marker;
    }
})

var RetailPoints = {
  radius: 10,
  opacity: 1,
  fillColor: "RED",
  fillOpacity: 0.5,
  weight: .05,
};

var RetailOverlay = L.geoJSON(NewRetailFloorArea, {
  pointToLayer: function (feature, latlng) {
    var marker = L.circleMarker(latlng, RetailPoints)
        .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });

     return marker;
    }
})

var StoragePoints = {
  radius: 10,
  opacity: 1,
  fillColor: "#939393",
  fillOpacity: 0.5,
  weight: .05,
};

var StorageOverlay = L.geoJSON(NewStorageFloorArea, {
  pointToLayer: function (feature, latlng) {
    var marker = L.circleMarker(latlng, StoragePoints)
        .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });

     return marker;
    }
})

var FactoryPoints = {
  radius: 10,
  opacity: 1,
  fillColor: "#262626",
  fillOpacity: 0.5,
  weight: .05,
};

var FactoryOverlay = L.geoJSON(NewFactoryFloorArea, {
  pointToLayer: function (feature, latlng) {
    var marker = L.circleMarker(latlng, FactoryPoints)
        .bindPopup(feature.properties.Address + ' Built in ' +  feature.properties.YearBuilt, {offset: [0, -6]});
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });

     return marker;
 }
})

var RezonedAreaOverlay = L.geoJSON(ZoningMapAmendments, {
  fillcolor: "#2b2e5e",
  fillOpacity: .5,
})

// var BaseMaps = {
//   "CensusTracts": CensusTractsBaseLayer,
// };

var overlays = {
  "Offices": OfficeOverlay,
  "Residential": ResidentialOverlay,
  "Retail": RetailOverlay,
  "Storage": StorageOverlay,
  "Factory": FactoryOverlay,
  "Rezoned Area": RezonedAreaOverlay,
};

L.control.layers({}, overlays).addTo(map);
