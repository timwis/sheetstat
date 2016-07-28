$(function() {
	var h1 = $('#selectors').outerHeight()
	var h2 = $('.indicators-container').height()
	$('#indicators').css({
		'margin-top': h1,
		'height': h2
	})
  $('.offset').css({
    'margin-top': -h1,
    'padding-top': h1
  })
})
