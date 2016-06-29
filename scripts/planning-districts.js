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
    updateIndicators(event.target.value);
    districtsLayer.setStyle(setDistrictStyle)
  })

  // Initialize map
  var map = L.map(container).setView(defaultCenter, defaultZoom)

  // Add basemap
 L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    minZoon: 12,
    maxZoom: 16
  }).addTo(map)

  // define polygon default styles
  var districtStyle = {
    "color": "#58c04d",
    "weight": 0.5,
    "opacity": 0.85
  };

  var setDistrictStyle = function (feature, highlighted){
    var style = {
      "color": "#58c04d",
      "weight": 0.5,
      "opacity": 0.85
    };

    // make inital polygon style match default value
    if (feature.properties.DIST_NAME == planningDistrictDropdown.value){
      style.color = '#2176d2'
    }
    return style;
  };

  // Add districts layer
  var districtsLayer = L.geoJson(districtsGeojson, {
    style: setDistrictStyle,

    // Create label popup on hover
    onEachFeature: function (feature, layer){
      if (feature.properties.DIST_NAME) {
        layer.bindLabel(feature.properties.DIST_NAME, { noHide: true });
      }
    }
  }).addTo(map)

  // When a district is clicked on the map, update the sidebar to reflect its indicators
  districtsLayer.on('click', function (event) {
    var districtName = event.layer.feature.properties.DIST_NAME
    var highlight = {
      'color': '#2176d2',
      'weight': 0.5,
      'opacity': 1
    };
    console.log(event.layer);
    updateIndicators(districtName)
	hideEmptyCards(districtName)

    // Set dropdown to the clicked planning district
    // and reset polygon style when another is clicked
    planningDistrictDropdown.value = districtName

    districtsLayer.setStyle(districtStyle);
    event.layer.setStyle(highlight);
  })
  // update the numeric values in right column when a new
  // district is selected
  function updateIndicators (districtName) {
    var indicators = indexedData[districtName] || {}
    for (var indicator in indicators) {
      document.getElementById('value-' + indicator).innerText = indicators[indicator]
    }
  }
  // check if indicator value is nil & add .hidden class
  function hideEmptyCards (districtName) {
	var indicators = indexedData[districtName] || {}
	for (var indicator in indicators) {
		if (indicators[indicator]) {
		  document.getElementById('card-' + indicator).classList.remove('hidden')
  		} else {
		  // remove('hidden')
		  document.getElementById('card-' + indicator).classList.add('hidden')
		}
	}
  }
  // Normalize data string contents to avoid breaking charts
  function slugify (text) {
    return text.toString().toLowerCase().trim()
      .replace(/[^a-zA-Z0-9]/g, '-')  // Replace non-alphanumeric chars with -
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^\-|\-$/i, '')        // Remove leading/trailing hyphen
  }
  // Formats numeric values as percentages
  function percentify (value) {
    return (Math.round(value * 100 * 10) / 10) + '%'
  }

})()
