var defaultCenter = [40.817155,-73.922968];
var defaultZoom = 14;

var map = L.map('map').setView(defaultCenter, defaultZoom);

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
  weight: 5,
}).addTo(map);

// var Stations = L.geoJSON(SubwayStations, {
//   radius: 10,
//   opacity: 1,
//   fillColor: "BlACK",
//   fillOpacity: 0.5,
//   weight: 1,
// }).addTo(map);

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
         .bindPopup(feature.properties.name +  feature.properties.line, {offset: [0, -6]});
         marker.on('mouseover', function (e) {
             this.openPopup();
         });
         marker.on('mouseout', function (e) {
             this.closePopup();
         });

      return marker;
  }
}).addTo(map);

// var LU_Map = L.geoJSON(PlutoData, {
//       style: function(feature) {
//
//           return {
//             color: 'BLACK',
//             fillColor: lookupLandUse(feature.properties.LandUse).color,
//             fillOpacity: 0.8,
//             weight: 1,
//           }
//       },
//
//     onEachFeature: function(feature, layer) {
//       const description = lookupLandUse(feature.properties.LandUse).description;
//
//       layer.bindPopup(`${feature.properties.Address}<br/>${description}`, {
//         closeButton: false,
//         minWidth: 60,
//         offset: [0, -10]
//       });
//       layer.on('mouseover', function (e) {
//         this.openPopup();
//
//         e.target.setStyle({
//           weight: 3,
//           color: '#FFF',
//         });
//
//         if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//             layer.bringToFront();
//         }
//       });
//       layer.on('mouseout', function (e) {
//         this.closePopup();
//         LU_Map.resetStyle(e.target);
//       });
//     }
//   }).addTo(map);

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

var overlays = {
  // "LandUse": LU_Map,
  "Offices": OfficeOverlay,
  "Residential": ResidentialOverlay,
  "Retail": RetailOverlay,
  "Storage": StorageOverlay,
  "Factory": FactoryOverlay,
};

L.control.layers({}, overlays).addTo(map);

// $(document).ready(function(){
// $("LandUse").click(function(){
//         $("#legend").hide();
//     });
// });
