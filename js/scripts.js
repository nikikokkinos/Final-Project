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

var PopulationCensusTracts = L.geoJSON(StudyAreaCensusTracts,
  { fillcolor: "BLUE"
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

var overlays = {
  "Offices": OfficeOverlay,
  "Residential": ResidentialOverlay,
  "Retail": RetailOverlay,
  "Storage": StorageOverlay,
  "Factory": FactoryOverlay,
  "Rezoned Area": RezonedAreaOverlay,
};

L.control.layers({}, overlays).addTo(map);

// // add event listeners for overlayadd and overlayremove
// map.on('overlayadd', handleLayerToggle);
// map.on('overlayremove', handleLayerToggle);
//
// function handleLayerToggle(eventLayer) {
// // get the name of the layergroup, and whether it is being added or removed
// var type = eventLayer.type;
// var name = eventLayer.name;
//
// // if being added, show the corresponding legend
// // else, hide it.
// if (eventLayer.type === 'overlayadd') {
//  $('#' + name + '-legend').show();
// } else {
//  $('#' + name + '-legend').hide();
// }
// }
