var map = L.map('map',{
  center: [40.817155,-73.922968],
  zoom: 14,
});

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var StudyAreaBoundary = L.geoJSON(StudyArea, {
  fillColor: "none",
  color: "#ff8049",
  weight: 3,
}).addTo(map);

var SubwayLines = L.geoJSON(BronxSubwayLines, {
  color: "BLACK",
  weight: 2,
}).addTo(map);

// Creating Color Based on Change Feature in StudyAreaCensusTracts
function getColor(Change) {
		return Change < 0 ? '#d7191c':
				Change > 0  ? '#fdae61' :
				Change > 10  ? '#ffffbf' :
				Change > 25  ? '#a6d96a' :
				Change > 26  ? '#1a9641' :
							'#FFEDA0';
	}

var PopulationCensusTracts = L.geoJSON(StudyAreaCensusTracts, {
  style: 	function(feature) {
  		return {
  			weight: 2,
  			opacity: 1,
  			color: 'white',
  			dashArray: '3',
  			fillOpacity: 0.7,
  			fillColor: getColor(feature.properties.Change)
  		};
  	},
}).addTo(map);

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
}

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
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

var overlays = {
  "Offices": OfficeOverlay,
  "Residential": ResidentialOverlay,
  "Retail": RetailOverlay,
  "Storage": StorageOverlay,
  "Factory": FactoryOverlay,
  "Rezoned Area": RezonedAreaOverlay,
};

L.control.layers({}, overlays).addTo(map);
