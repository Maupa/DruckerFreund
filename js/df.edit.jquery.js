(function($){

	$.fn.df_edit = function(options){
		var defs = $.extend({}, options);

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
				item: function(type, data){
				// 	var item = '<div class="printer add">';
				// 	for(key of Object.keys(data)){
				// 		item += this.keyval(key, data[key]);
				// 	}
				// 		<input type="text" autocomplete="off" name="name"  placeholder="Name"><br/>
				// 		<input type="text" autocomplete="off" name="qname"  placeholder="Queue name"><br/>
				// 		<input type="text" autocomplete="off" name="location"  placeholder="Location"><br/>
				// 		<input type="text" autocomplete="off" name="group"  placeholder="Group"><br/>
				// 		<input type="text" autocomplete="off" name="driver"  placeholder="Driver"><br/>
				// 		<input type="button" class="submit" autocomplete="off" name="submit" value="Submit"><br/>
				// 	</div>
				}

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
								// .animate({

								// }, 250);

						});
					}
				})
				// $(this)
				// .parents().eq(2).animate({
				// 	height: 0, 
				// 	width: 0,
				// 	opacity: 0
				// }, 250);
			}
		};


		$('.df_btn_add').on('click', handlers.submit);
		// var structures = {
		// 	printer : {
				
		// 	}
		// }
		var converter = { name : 'Name', qname : 'Queue name', location : 'Location', group : 'Group', driver : 'Driver' };
		
		
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