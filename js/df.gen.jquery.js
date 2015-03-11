(function($){

	$.fn.df_gen = function(options){
		var defaults = $.extend({}, options);
		var cache = {
			printers: [],
			drivers: {}
		};

		var Super = this;

		var models = {
			script: function(data){
				var o = def === data.qname ? ' -d ' : '';
				var name = data.name === '' ? data.qname : data.name; 
				return '/usr/sbin/lpadmin -p ' + data.qname + ' -L "' 
					+ data.location + '" -E -v ' + options.domain + data.name 
					+ ' -P "/Library/Printers/PPDs/Contents/Resources/' + driver[data.driver] + '"'
					+ ' -D "' +  name + '"';
			}
		}


		$.getJSON('data/printers.json').done(function(data){
			cache.printers = data;
		}).fail(function(){
			console.log('Error while loading ' + 'printers.json.</br> Please fix the JSON and refresh the page.');
		});

		$.getJSON('data/drivers.json').done(function(data){
			for(driver of data){
				cache.drivers[driver.name] = driver.location
			}
		}).fail(function(){
			console.log('Error while loading ' + 'drivers.json.</br> Please fix the JSON and refresh the page.');
		});

		$(Super).change(function(){
			$('option:selected', Super).each(function() {
				console.log(this);
			})
		})
	}

})(jQuery)