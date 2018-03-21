var map = L.map('map',{
  center: [40.815141,-73.934169],
  zoom: 14,
  // layers: [CensusTracts, Office, Residential, Retail, Storage, Factory, RezonedArea],
});

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adding CT Colors Based on Change Property
function getColor(Change) {
		return Change < 1 ? '#d7191c' :
				Change < 6  ? '#fdae61' :
				Change < 11  ? '#ffffbf' :
				Change < 21  ? '#a6d96a' :
        Change < 158 ? '#1a9641' :
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

// Creating Highlight on Hover
function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

		// if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		// 	layer.bringToFront();
		// }

		info.update(layer.feature.properties);
	}

var CensusTractsOverlayLayer;

function resetHighlight(e) {
	CensusTractsOverlayLayer.resetStyle(e.target);
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

CensusTractsOverlayLayer = L.geoJson(StudyAreaCensusTracts, {
		style: style,
		onEachFeature: onEachFeature
}).addTo(map);

// Control that Shows CT Population Info on Hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Population % Change <br> Between ACS Survey Years <br> 2006 - 2010 & 2012 - 2016</h4>' +
  (props ? '<b>' + 'Census Tract' + " " + props.CTLabel + '</b><br />' + props.Change + '% Change'
    : 'Hover Over a Census Tract');
};

info.addTo(map);

// Creating Choropleth legend
var Choroplethlegend = L.control({position: 'bottomright'});

Choroplethlegend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend population-legend'),
    grades = [-23, 1, 5, 10, 20, 160],
    labels = [],
    from, to;

  grades.forEach(function (grade, i) {
    if (i===5) return;
    var from = grade;
    var to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  })

  div.innerHTML = labels.join('<br>');
  return div;
};

Choroplethlegend.addTo(map);

// Creating Second Choropleth Map New Residential DUs
function getColor2(Res_Units) {
  console.log(Res_Units)
		return Res_Units <= 30 ? '#d7191c' :
				Res_Units <= 100 ? '#fdae61' :
				Res_Units <= 300  ? '#ffffbf' :
				Res_Units <= 500  ? '#a6d96a' :
        Res_Units <= 1000 ? '#1a9641' :
							'#FFEDA0';
	}

function style2(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor2(feature.properties.Res_Units)
		};
	}

// Creating Highlight on Hover
function highlightFeature2(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

		// if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		// 	layer.bringToFront();
		// }

		info.update(layer.feature.properties);
	}

var DUsLayer;

function resetHighlight2(e) {
	DUsLayer.resetStyle(e.target);
	info.update();
}

function zoomToFeature2(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature2(feature, layer) {
	layer.on({
		mouseover: highlightFeature2,
		mouseout: resetHighlight2,
		click: zoomToFeature2
		});
	}

DUsLayer = L.geoJson(StudyAreaCensusTracts, {
		style: style2,
		onEachFeature: onEachFeature
})

// Control that Shows DU Info on Hover
var info2 = L.control();

info2.onAdd = function (map2) {
  this._div = L.DomUtil.create('div', 'info DU');
  this.update();
  return this._div;
};

info2.update = function (props) {
  this._div.innerHTML = '<h4>New Residential Dwelling Units <br> Created in Last 15 Years</h4>' +
  (props ? '<b>' + 'Census Tract' + " " + props.CTLabel + '</b><br />' + props.Res_Units + 'Dwelling Units'
    : 'Hover Over a Census Tract');
    console.log(this)
    return this;
};

info2.addTo(map);

// Second Choropleth Legend
var Choroplethlegend2 = L.control({position: 'bottomright'});

Choroplethlegend2.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend du-legend'),
    grades = [0, 30, 100, 300, 500, 1000],
    labels = [],
    from, to;

  grades.forEach(function (grade, i) {
    if (i===5) return;
    var from = grade;
    var to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  })

  div.innerHTML = labels.join('<br>');
  return div;
};

Choroplethlegend2.addTo(map);

// hiding the DU Legend by Default
$('.du-legend').hide()

var OfficePoints = {
    radius: 10,
    weight: 1,
    fillColor: "ORANGE",
    fillOpacity: 1,
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
  weight: 1,
  fillColor: "YELLOW",
  fillOpacity: 1,
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
  weight: 1,
  fillColor: "RED",
  fillOpacity: 1,
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
  weight: 1,
  fillColor: "#939393",
  fillOpacity: 1,
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
  weight: 1,
  fillColor: "#d36ff4",
  fillOpacity: 1,
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
  fillColor: "#2b2e5e",
  fillOpacity: .5,
  color: "#2b2e5e",
})

var choropleths = {
  "Population Change": CensusTractsOverlayLayer,
  "DU Overlay": DUsLayer,
}

var overlays = {
  "New Office": OfficeOverlay,
  "New Residential": ResidentialOverlay,
  "New Retail": RetailOverlay,
  "New Storage": StorageOverlay,
  "New Factory": FactoryOverlay,
  "Zoning Map Amendments": RezonedAreaOverlay,
};

L.control.layers(choropleths, overlays).addTo(map);

// Calling on legends to show or hide
map.on('baselayerchange', handleLayerToggle);
// map.on('overlayremove', handleLayerToggle);

function handleLayerToggle(eventLayer) {
  console.log(eventLayer)
  $('.legend').hide()
  var name  = eventLayer.name
  if (name === 'DU Overlay') {
    $('.du-legend').show()
  }
  if (name === 'Population Change') {
    $('.population-legend').show()
  }

}

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
