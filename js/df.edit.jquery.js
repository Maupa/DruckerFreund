(function($){

	$.fn.df_edit = function(options){
		var defs = $.extend({}, options);

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
			}
		};
		var structures = {
			printer : {
				
			}
		}
		var converter = { name : 'Name', qname : 'Queue name', location : 'Location', group : 'Group', driver : 'Driver' };
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
			}
			// edit: {
			// 	item: function(type, data){
			// 	// 	var item = '<div class="printer add">';
			// 	// 	for(key of Object.keys(data)){
			// 	// 		item += this.keyval(key, data[key]);
			// 	// 	}
			// 	// 		<input type="text" autocomplete="off" name="name"  placeholder="Name"><br/>
			// 	// 		<input type="text" autocomplete="off" name="qname"  placeholder="Queue name"><br/>
			// 	// 		<input type="text" autocomplete="off" name="location"  placeholder="Location"><br/>
			// 	// 		<input type="text" autocomplete="off" name="group"  placeholder="Group"><br/>
			// 	// 		<input type="text" autocomplete="off" name="driver"  placeholder="Driver"><br/>
			// 	// 		<input type="button" class="submit" autocomplete="off" name="submit" value="Submit"><br/>
			// 	// 	</div>
			// 	}

			// }

		};
		
		$.getJSON('data/printers.json').done(function(data){
			for(item of data){
				$('.printers').append(models.view.item('printer', item));
			}
			$('.close').on("click", handlers.destroy);
		});

		$.getJSON('data/drivers.json').done(function(data){
			for(item of data){
				$('.drivers').append(models.view.item('driver', item));
			}
			$('.close').on("click", handlers.destroy);
		});
	}
	
})(jQuery)