var httpTest = {
	run: function() {
		this.constructData();
	},
	constructData: function() {
		var url = $('input#base_url').val() + '/' + $('input#rest_method').val();
		var type = $('select#http_method').val();
		var data = {};
		
		if (type != 'GET') {
			$('.params').each(function() {
				//var name = $(this).attr()
				var name = $(this).find('.param_names').attr('value');
				var value = $(this).find('.param_values').attr('value');
				
				if (name != '') {
					data[name] = value;
				}
				
			});
		}
		
		$.ajax({
			url: url,
			type: type,
			data: data,
			success: this.success,
			fail: this.fail
		});
		var details = 'Sent a request to ' + url + ' (' + type + ')<br />';
		if (data != {}) {
			details += 'With data:<br/ >';

			for (var i in data) {
				details += i + ': ' + data[i];
			}
		}
		
		$('#details').html(details);
	},
	insertNewRow: function() {
		var rowString = "<div class='params'><span>Name: <input size='30' type='text' class='param_names' value=''></span><span> Value: <input size='30' type='text' class='param_values' value=''></span> <input type='button' name='add_params' value='+' id='add_params'></div>";
		$('select#http_method').after(rowString);
	},
	showNote: function() {
		
	},
	hideNote: function() {
		
	},
	success: function(data) {
		$('#result').html(data);
	},
	error: function() {
		alert('fail');
	}, 
	showParams: function() {
		$('.params').show();
	},
	hideParams: function() {
		$('.params').hide();
	}
}

$(document).ready(function() {
	$('select#http_method').change(function() {
		if ($(this).val() == 'PUT' || $(this).val() == 'DELETE') {
			httpTest.showNote();	
		}
		
		if ($(this).val() == 'GET') {
			httpTest.hideParams();	
		}
		else {
			httpTest.showParams();
		}
		
	});
	$('#run').click(function() {
		httpTest.run();
	});
	
	$('#add_params').live('click', function() {
		httpTest.insertNewRow();
		$(this).attr('value', '-');
		$(this).addClass('remove_params');
		$(this).attr('id', '');
	});
	
	$('.remove_params').live('click', function() {
		$(this).parent().remove();
	});
	//need to bind new row
	
});