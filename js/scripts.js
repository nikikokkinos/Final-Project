var map = L.map('map',{
  center: [40.815141,-73.934169],
  zoom: 14,
  // layers: [CensusTracts, Office, Residential, Retail, Storage, Factory, RezonedArea],
});

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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

// Control that Shows CT Info on Hover
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

// Adding CT Colors Based on Change Property
function getColor(Change) {
		return Change < 1 ? '#d7191c' :
				Change < 6  ? '#fdae61' :
				Change < 11  ? '#ffffbf' :
				Change < 21  ? '#a6d96a' :
        Change < 160 ? '#1a9641' :
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

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

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

//  Creating Choropleth legend
var Choroplethlegend = L.control({position: 'bottomright'});

Choroplethlegend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [-23, 1, 5, 10, 20, 160],
    labels = [],
    from, to;

  for (var i = -23; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

Choroplethlegend.addTo(map);

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
  fillColor: "#d36ff4",
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
  fillColor: "#2b2e5e",
  fillOpacity: .5,
  color: "#2b2e5e",
  // Trying to add a popup on mouseover of layer
    // .bindPopup(feature.properties.PROJECT_NA)
    // RezonedAreaOverlay.on('mouseover', function (e) {
    //     this.openPopup();
    // });
    // RezonedAreaOverlay.on('mouseout', function (e) {
    //     this.closePopup();
    // });
    //
    // return RezonedAreaOverlay;
})

// var CensusTracts = L.layerGroup([CensusTractsOverlayLayer]);
// var Office = L.layerGroup([OfficeOverlay]);
// var Residential = L.layerGroup([ResidentialOverlay]);
// var Retail = L.layerGroup([RetailOverlay]);
// var Storage = L.layerGroup([StorageOverlay]);
// var Factory = L.layerGroup([FactoryOverlay]);
// var RezonedArea = L.layerGroup([RezonedAreaOverlay]);

var overlays = {
  "Population Change": CensusTractsOverlayLayer,
  "New Office": OfficeOverlay,
  "New Residential": ResidentialOverlay,
  "New Retail": RetailOverlay,
  "New Storage": StorageOverlay,
  "New Factory": FactoryOverlay,
  "Zoning Map Amendments": RezonedAreaOverlay,
};

L.control.layers({}, overlays).addTo(map);

// L.control.layers({}, {
//   Census_Tracts: CensusTracts,
//   New_Office: Office,
//   New_Residential: Residential,
//   New_Retail: Retail,
//   New_Storage: Storage,
//   New_Factory: Factory,
//   New_Rezoned_Area: RezonedArea
// }).addTo(map);

// add event listeners for overlayadd and overlayremove
// map.on('overlayadd', handleLayerToggle);
// map.on('overlayremove', handleLayerToggle);
//
// function handleLayerToggle(eventLayer) {
// 	// get the name of the layergroup, and whether it is being added or removed
//   var type = eventLayer.type;
//   var name = eventLayer.name;
//
// 	// if being added, show the corresponding legend
//   // else, hide it.
//   if (eventLayer.type === 'overlayadd') {
//     $('#' + name + '-legend').show();
//   } else {
//     $('#' + name + '-legend').hide();
//   }
// }
