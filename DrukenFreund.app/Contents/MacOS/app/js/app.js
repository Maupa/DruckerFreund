(function($) {

	$.fn.shopaholic = function(params) {
		var options = $.extend({
			data: '/data/items.json' //This line adding another parameter to the options... ```expands``` it
		}, params);
		var printers = {};
		var Super = this;
		var domain = "";
		var model = {
			printer: function(data){
				return "lpadmin -p " + data.name + " -L \"" + data.location + "\" -E -v "+ domain + data.name + " -P /Library/Printers/PPDs/Contents/Resources/" + data.driver
			}
		};

		$.getJSON( 'data/items.json', function( data ) {
			$.each( data, function( n, item ) {
				printers[item.name] = item;
				var chkbx = $('<p><input type="checkbox" data-name="' + item.name + '" name="checkbox"/>' + item.name + '</p>');
				Super.prepend(chkbx);
			});
		});
		options.thatbooton.click(function(){
			options.shell.html('')
			$('.chk_box input:checked').each(function() {
				options.shell.append('<p>' + model.printer(printers[$(this).data('name')]) + '</p>');
			});
        });
	};
	
}(jQuery));