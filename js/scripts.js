var map = L.map('map', {
  center: [40.817284,-73.939962],
  zoom: 14,
});

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// passing CT population change layer
var CensusTractsOverlayLayer = L.geoJson(StudyAreaCensusTracts, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

// a function which assigns a color based on % of population change property
function getCTColor(Change) {
  return Change < 1   ? '#d7191c' :
         Change < 6   ? '#fdae61' :
         Change < 11  ? '#ffffbf' :
         Change < 21  ? '#a6d96a' :
         Change < 158 ? '#1a9641' :
                        '#FFEDA0';
}

// a function which styles each CT based on the above function
function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getCTColor(feature.properties.Change)
  };
}

// Creating onEachFeature functions
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

  infoCT.update(layer.feature.properties);
}

function resetHighlight(e) {
  CensusTractsOverlayLayer.resetStyle(e.target);
  infoCT.update();
  CensusTractsOverlayLayer.bringToBack();
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

// creating a new control that holds the ct layer's info and updates based on mouse events
var infoCT = L.control();

infoCT.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'infoCT');
  this.update();
  return this._div;
};

infoCT.update = function(props) {
  this._div.innerHTML = '<h4>Population % Change <br> Between ACS Survey Years <br> 2006 - 2010 & 2012 - 2016</h4>' +
    (props ? '<b>' + 'Census Tract' + " " + props.CTLabel + '</b><br />' + props.Change + '%' + ' ' + 'Population Change' : 'Hover Over a Census Tract');
  };

infoCT.addTo(map);

// creating a new control that loops through density grades to act as a leged
var legendCT = L.control(
  {
    position: 'bottomright'
  });

legendCT.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'legendCT'),
    grades = [-23, 1, 5, 10, 20, 160],
    labels = [],
    from, to;

  grades.forEach(function(grade, i) {
    if (i === 5) return;
    var from = grade;
    var to = grades[i + 1];

    labels.push(
      '<i style="background:' + getCTColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  })

  div.innerHTML = labels.join('<br>');
  return div;
};

legendCT.addTo(map);

// passing dwelling unit layer
var DUsLayer = L.geoJson(StudyAreaCensusTracts, {
  style: styleDU,
  onEachFeature: onEachFeatureDU,
})

// creating a function that colors each CT by the # of new dwelling untis built
function getResColor(Res_Units) {
  return  Res_Units < 100  ? '#d7191c' :
          Res_Units < 300  ? '#fdae61' :
          Res_Units < 500  ? '#ffffbf' :
          Res_Units < 700  ? '#a6d96a' :
          Res_Units < 1710 ? '#1a9641' :
                             '#FFEDA0';
}

// creating a function which styles each CT based on the above function
function styleDU(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getResColor(feature.properties.Res_Units)
  };
}

// creating onEachFeature functions
function highlightFeatureDU(e) {
  var layerDU = e.target;

  layerDU.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  	layerDU.bringToFront();
  }

  infoDU.update(layerDU.feature.properties);
}

function resetHighlightDU(e) {
  DUsLayer.resetStyle(e.target);
  infoDU.update();
  DUsLayer.bringToBack();
}

function zoomToFeatureDU(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeatureDU(feature, layer) {
  layer.on({
    mouseover: highlightFeatureDU,
    mouseout: resetHighlightDU,
    click: zoomToFeatureDU,
  });
}

// creating infoDU that shows change in number of dwelling units
var infoDU = L.control();

  infoDU.onAdd = function(map2) {
  this._div = L.DomUtil.create('div', 'infoDU');
  this.update();
  return this._div;
};

infoDU.update = function(properties) {
  this._div.innerHTML = '<h4>New Residential Dwelling Units <br> Created in Last 15 Years</h4>' +
    (properties ? '<b>Census Tract ' + properties.CTLabel + '</b><br>' + properties.Res_Units + ' Dwelling Units Created ' :
      'Hover Over a Census Tract');
};

infoDU.addTo(map);

// hiding the Info DU by Default
$('.infoDU').hide()

// creating a new control that loops through density grades to act as a leged
var legendDU = L.control({
  position: 'bottomright'
});

legendDU.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'legendDU'),
    grades = [0, 100, 300, 500, 700, 1709],
    labels = [],
    from, to;

  grades.forEach(function(grade, i) {
    if (i === 5) return;
    var from = grade;
    var to = grades[i + 1];

    labels.push(
      '<i style="background:' + getResColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  })

  div.innerHTML = labels.join('<br>');
  return div;
};

legendDU.addTo(map);

// hiding the DU Legend by Default
$('.legendDU').hide()

// Adding all Point Data
var OfficePoints = {
  radius: 10,
  weight: 1,
  fillColor: "ORANGE",
  fillOpacity: 1,
};

var OfficeOverlay = L.geoJSON(NewOfficeFloorArea, {
  pointToLayer: function(feature, latlng) {
    var marker = L.circleMarker(latlng, OfficePoints)
      .bindPopup(feature.properties.Address + ' Built in ' + feature.properties.YearBuilt, {
        offset: [0, -6]
      });
    marker.on('mouseover', function(e) {
      this.openPopup();
    });
    marker.on('mouseout', function(e) {
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
  pointToLayer: function(feature, latlng) {
    var marker = L.circleMarker(latlng, ResidentialPoints)
      .bindPopup(feature.properties.Address + ' Built in ' + feature.properties.YearBuilt, {
        offset: [0, -6]
      });
    marker.on('mouseover', function(e) {
      this.openPopup();
    });
    marker.on('mouseout', function(e) {
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
  pointToLayer: function(feature, latlng) {
    var marker = L.circleMarker(latlng, RetailPoints)
      .bindPopup(feature.properties.Address + ' Built in ' + feature.properties.YearBuilt, {
        offset: [0, -6]
      });
    marker.on('mouseover', function(e) {
      this.openPopup();
    });
    marker.on('mouseout', function(e) {
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
  pointToLayer: function(feature, latlng) {
    var marker = L.circleMarker(latlng, StoragePoints)
      .bindPopup(feature.properties.Address + ' Built in ' + feature.properties.YearBuilt, {
        offset: [0, -6]
      });
    marker.on('mouseover', function(e) {
      this.openPopup();
    });
    marker.on('mouseout', function(e) {
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
  pointToLayer: function(feature, latlng) {
    var marker = L.circleMarker(latlng, FactoryPoints)
      .bindPopup(feature.properties.Address + ' Built in ' + feature.properties.YearBuilt, {
        offset: [0, -6]
      });
    marker.on('mouseover', function(e) {
      this.openPopup();
    });
    marker.on('mouseout', function(e) {
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

// Layers that don't go away added
var StudyAreaBoundary = L.geoJSON(StudyArea, {
  fillColor: "none",
  color: "#191d5b",
  weight: 3,
})

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

var SubwayStationPoints = L.geoJSON(BronxSubwayStations, {
  pointToLayer: function(feature, latlng) {
    var marker = L.circleMarker(latlng, SubwayPoints)
      .bindPopup(feature.properties.name + "<br>" + feature.properties.line);
    marker.on('mouseover', function(e) {
      this.openPopup();
    });
    marker.on('mouseout', function(e) {
      this.closePopup();
    });

    return marker;
  }
}).addTo(map);

var baselayers = {
  "Population Change": CensusTractsOverlayLayer,
  "New Dwelling Units by Census Tract": DUsLayer,
  "Study Area": StudyAreaBoundary
}

var overlays = {
  "New Office":       OfficeOverlay,
  "New Residential":  ResidentialOverlay,
  "New Retail":       RetailOverlay,
  "New Storage":      StorageOverlay,
  "New Factory":      FactoryOverlay,
  "Zoning Map Amendments": RezonedAreaOverlay,
};

L.control.layers(baselayers, overlays).addTo(map);

// Calling on legends to show or hide
// function that shows & hides info divs based on which layer is on
map.on('baselayerchange', function(eventLayer) {
  if (eventLayer.name === 'Population Change'){
  	$('.infoDU').hide()
  }
	if (eventLayer.name === 'Population Change'){
		$('.legendDU').hide()
	}
  if (eventLayer.name === 'Population Change'){
  	$('.infoCT').show()
  }
	if (eventLayer.name === 'Population Change'){
		$('.legendCT').show()
	}
  if (eventLayer.name === 'New Dwelling Units by Census Tract'){
    $(".infoCT").hide()
  }
  if (eventLayer.name === 'New Dwelling Units by Census Tract'){
    $(".legendCT").hide()
  }
  if (eventLayer.name === 'New Dwelling Units by Census Tract'){
  	$('.infoDU').show()
  }
	if (eventLayer.name === 'New Dwelling Units by Census Tract'){
		$('.legendDU').show()
	}
  if (eventLayer.name === 'Study Area'){
    $('.legendDU').hide()
  }
  if (eventLayer.name === 'Study Area'){
    $('.infoDU').hide()
  }
  if (eventLayer.name === 'Study Area'){
    $('.legendCT').hide()
  }
  if (eventLayer.name === 'Study Area'){
    $('.infoCT').hide()
  }
});
