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
		var models = {
			keyval: function(key, value){
				return  '<div class="large-12 columns">' +
							'<div class="large-6 columns tr">"<span class="green">' + key + '</span>" :</div>' +
							'<div class="large-6 columns tl crop">"<span class="green">' + value + '</span>"</div>' +
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

		};

		$.getJSON('data/printers.json').done(function(data){
			for(printer of data){
				$('.printers').append(models.item('printer', printer));
			}
			$('.close').on("click", handlers.destroy);
		});
	}
	
})(jQuery)