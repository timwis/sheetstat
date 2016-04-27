(function () {
  var defaultCenter = [39.9628, -75.1185]
  var defaultZoom = 11

  // Index the data by planning district
  var indexedData = {}
  data.forEach(function (row) {
    var indicatorSlug = slugify(row.Indicator)
    labels.forEach(function (label) {
      if (!indexedData[label]) indexedData[label] = {}
      var value = row.dataType === 'Percentage' ? percentify(row[label]) : row[label]
      indexedData[label][indicatorSlug] = value
    })
  })

  // When planning district dropdown changes, update indicators
  var planningDistrictDropdown = document.getElementById('planning-district')
  planningDistrictDropdown.addEventListener('change', function (event) {
    updateIndicators(event.target.value)
  })

  // Initialize map
  var map = L.map(container).setView(defaultCenter, defaultZoom)

  // Add basemap
  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    minZoon: 12,
    maxZoom: 16
  }).addTo(map)
  
  var districtStyle = {
    "color": "#58c04d",
    "weight": 2,
    "opacity": 0.85
  };

  
  // Add districts layer
  var districtsLayer = L.geoJson(districtsGeojson, {
    style: districtStyle,
    onEachFeature: function (feature, layer){
      if (feature.properties.DIST_NAME) {
        layer.bindLabel(feature.properties.DIST_NAME, { noHide: true });
      }
    }
  }).addTo(map)
//  .showLabel();
//  
//  window.districtsLayer = districtsLayer;
//  
//  districtsLayer.eachLayer(function(layer) {
//    // Find polygon centroid using Leaflet
//    var polygonCenter = districtsLayer.getBounds().getCenter();
//
//    // Bind labels using Leaflet.label plugin
//    L.marker(polygonCenter)
//      .bindLabel(feature.properties.DIST_NAME, { noHide: true })
//      .addTo(map)
//      .showLabel();
//  })
  // Bind district labels
//  function addInfo(feature, layer){
//    if (feature.properties.DIST_NAME) {
//      layer.bindLabel(feature.properties['DIST_NAME'], { noHide: true });
//    }
//  }
//  
//  // Display district labels
//  districtsLayer.on('mouseover', function(e) {
//    e.layer.openPopup();
//  });
//  districtsLayer.on('mouseout', function(e) {
//    e.layer.closePopup();
//  });

  // When a district is clicked on the map, update the document to reflect its indicators
  districtsLayer.on('click', function (event) {
    var districtName = event.layer.feature.properties.DIST_NAME 
    updateIndicators(districtName)

    // Set dropdown to the clicked planning district
    planningDistrictDropdown.value = districtName
  })

  function updateIndicators (districtName) {
    var indicators = indexedData[districtName] || {}
    for (var indicator in indicators) {
      document.getElementById('value-' + indicator).innerText = indicators[indicator]
    }
  }

  function slugify (text) {
    return text.toString().toLowerCase().trim()
      .replace(/[^a-zA-Z0-9]/g, '-')  // Replace non-alphanumeric chars with -
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^\-|\-$/i, '')        // Remove leading/trailing hyphen
  }

  function percentify (value) {
    return (Math.round(value * 100) / 10) + '%'
  }
})()
