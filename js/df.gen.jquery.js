(function($){

	$.fn.df_gen = function(options){
		var defaults = $.extend({
			scripts: $('.scripts'),
			domain: 'example.com'
		}, options);
		var cache = {
			printers: {},
			drivers: {}
		};

		var Super = this;

		var models = {
			script: function(data){
				var name = data.name === '' ? data.qname : data.name; 
				return '/usr/sbin/lpadmin -p ' + data.qname + ' -L "' 
					+ data.location + '" -E -v ' + defaults.domain + '/' + data.name 
					+ ' -o printer-is-shared=false '
					+ ' -P "/Library/Printers/PPDs/Contents/Resources/' + cache.drivers[data.driver] + '"'
					+ ' -D "' +  name + '"';
			}
		};


		$.getJSON('data/printers.json').done(function(data){
			cache.printers = data;

			for(printer of data){

				cache.printers[printer.qname] = printer;

				var option = $('<option value=\"' + printer.qname + '\">' + printer.name + '</option>');
				if($("optgroup[label=\'" + printer.group + "\']").html() == null ) $(Super).append('<optgroup label=\"' + printer.group + '\"></optgroup>');
				$("optgroup[label=\'" + printer.group + "\']").append(option);
			}
				
		}).fail(function(){
			console.log('Error while loading ' + 'printers.json.</br> Please fix the JSON and refresh the page.');
		});

		$.getJSON('data/drivers.json').done(function(data){
			for(driver of data){
				cache.drivers[driver.name] = driver.location;
			}
		}).fail(function(){
			console.log('Error while loading ' + 'drivers.json.</br> Please fix the JSON and refresh the page.');
		});

		$(Super).change(function(){
			$(defaults.scripts).html('');
			$('option:selected', Super).each(function() {
				var id = cache.printers[$(this).attr('value')];
				$(defaults.scripts).append('<p>' + models.script(id) + '</p>');
			});
		})
	}

})(jQuery)
