(function($){

	$.fn.df_edit = function(options){
		var defs = $.extend({}, options);
		var structures = {
			printers: {},
			drivers: {}
		};

		var models = {
			view: {
				keyval: function(key, value){
				return  '<div class="large-12 columns">' +
							'<div class="large-4 columns tr">"<span class="green">' + key + '</span>" :</div>' +
							'<div class="large-8 columns tl crop">"<span class="green">' + value + '</span>"</div>' +
						'</div>';
				},
				item: function(type, data){
					var item = '<div class="' + type + '">' +
									'<div class="large-12 columns">' +
										'<div class="large-2 columns top-bracket">{</div>' +
										'<div class="large-10 columns tr"><button class="close" title="Delete">✖</button></div>' +
									'</div>';
									for(key of Object.keys(data)){
										item += this.keyval(key, data[key]);
									}
					item += 		'<div class="large-12 columns bottom-bracket">},</div>' + 
								'</div>';
					return item;

				}
			},
			edit: {
				item: function(type, data){}
			}

		};


		String.prototype.df_check = function(type, item) {
			var check = {
				qname: function(str){
					return str.search(/[A-Za-z0-9\-\_]+/) !== -1 ? true : false  
				},
				driver: function(driver){
					//Checks if driver exists
					return structures[driver] !== undefined ? true : false
				},
				other: function(str){
					return str.search(/[\w\d]+/) !== -1 ? true : false  
				}
			}
			
			if(type !== 'qname' && type !== 'driver'){
				return check['other'](item);
			}else{
				return check[type](item);
			}
		};

	

		
		var handlers = {
			destroy: function(){
				$(this)
				.parents().eq(2)
				.animate({
					height: 0, 
					width: 0,
					opacity: 0
				}, 250, function(){
					$(this).remove();
				});
			},
			submit: function(){
				var x = $(this).parents().eq(2);
				$('input, select', x).each(function(){
					if($(this).hasClass('df_btn_add')){

						$(this).parents().eq(1).animate({
							width: 0
						}, 250, function(){
							$(this).remove();
						});

					}else{
						$(this).animate({
							width: 0
						}, 250, function(){
							// $(this).remove();
							var value = $(this).val();
							var type = $(this);
							var parent = $(this).parent();
							$(parent).html('');
							$(parent)
								.append('"<span class="green">' + value + '</span>"');
						});
					}
				})
			}
		};


		$('.df_btn_add').on('click', handlers.submit);

		var converter = { name : 'Name', qname : 'Queue name', location : 'Location', group : 'Group', driver : 'Driver' };
		
		$(document).on("click", '.close', handlers.destroy);
		
		$.getJSON('data/printers.json').done(function(data){
			for(item of data){
				$('.printers').append(models.view.item('printer', item));
			}

			cache.printers[printer.qname] = printer;
		}).fail(function(){
			console.log('Error while loading ' + 'printers.json.</br> Please fix the JSON and refresh the page.');
		});

		$.getJSON('data/drivers.json').done(function(data){
			for(item of data){
				$('.drivers').append(models.view.item('driver', item));
			}

			cache.drivers[driver.name] = driver.location;

		}).fail(function(){
			console.log('Error while loading ' + 'drivers.json.</br> Please fix the JSON and refresh the page.');
		});
	}
	
})(jQuery)