$(document).ready(function() {
    $("#btn-submit").click(function(e) {
        var formMethod = "POST";
        var formURL = "/interests";
        
        var sendInfo = {
			interest: {
				category: $('#input-category').val(),
				value: $('#input-value').val()
			}
		};        
        
		$.ajax({
		    url : formURL,
			type: formMethod,
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(sendInfo),
			success:function(data, textStatus, jqXHR) {
				alert("Match Interest saved!");
			},
			error: function(jqXHR, textStatus, error) {
                alert("Match Interest saved!");
			}
	    });
		e.preventDefault(); //STOP default action
		e.unbind(); //unbind. to stop multiple form submit.
	});
});


