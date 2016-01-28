---
layout: grid
title: Police Department
---

# Reported Crime Incidents

{% include components/bar_crimes_by_month.html height=300 %}
<div id="last_updated"></div>
<script>
var last_updated = $('#last_updated')
$.getJSON('https://api.github.com/repos/timwis/sheetstat/commits?path=_data/crimes_by_district.csv', function (data) {
  var lastCommit = data[0].commit
  last_updated.text('last updated ' + lastCommit.committer.date + ' by ' + lastCommit.committer.name)
})
</script>

# Crime Incidents by Type

{% include components/bar_crimes_by_type.html height=300 %}

# Crime Incidents by District

{% include components/map_crimes_by_district.html height=300 %}