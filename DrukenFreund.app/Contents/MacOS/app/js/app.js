(function($) {

	$.fn.shopaholic = function(params) {
		var options = $.extend({
			data: 'data/printers.json', //This line adding another parameter to the options... ```expands``` it
			drivers: 'data/drivers.json' //This line adding another parameter to the options... ```expands``` it
		}, params);
		var printers = {};
		var driver = {};
		var Super = this;
		var domain = ""; //domain with tp
		var model = {
			printer: function(data){
				return "lpadmin -p " + data.name + " -L \"" + data.location + "\" -E -v "+ domain + data.name + " -P \"/Library/Printers/PPDs/Contents/Resources/" + driver[data.driver] + "\""
			}
		};

		$.getJSON( options.data, function( data ) {
			$.each( data, function( n, item ) {
				printers[item.name] = item;
				var chkbx = $('<p><input type="checkbox" data-name="' + item.name + '" name="checkbox"/>' + item.name + '</p>');
				Super.prepend(chkbx);
			});
		});
		$.getJSON( options.drivers, function( data ) {
			driver = data;
		});
		options.thatbooton.click(function(){
			options.shell.html('');
			$('.chk_box input:checked').each(function() {
				options.shell.append('<p>' + model.printer(printers[$(this).data('name')]) + '</p>');
			});
			window.location.href = '#shell';
        });
	};
	
}(jQuery));