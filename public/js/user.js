$(document).ready(function() {
    $('#sel-int-category')       
            .multiselect({enableFiltering: true, placeholder : "Select category"})
            .end();
    $('#sel-int-value')       
            .multiselect({enableFiltering: true})
            .end();

    $.getJSON('/interests', function(data) {
        //iterate over the data and append a select option
        $("#sel-int-category").append("<option selected disabled class='hidden'>None selected</option>").multiselect('rebuild');
        $.each(data.interests, function(key, val) {
            $("#sel-int-category").append("<option>"+ val.category + "</option>").multiselect('rebuild');
        });
                
        $("#sel-int-category").change(function() {
            $("#sel-int-value").empty();
            $.each(data.interests, function(key, val) {
                if (val.category == $("#sel-int-category").val()) {
                $("#sel-int-value").append("<option>"+ val.value + "</option>").multiselect('rebuild');
                }
            });
        });


    });

    $('#table-interests').DataTable({});

    $('#btn-add').click(function() {
        var category = $("#sel-int-category").val();
        var value = $("#sel-int-value").val();

        if (category == "" || value == "") {
    		return;
    	}

        var tr = "<tr>"
               + "<td>" + category + "</td>"
               + "<td>" + value + "</td>"
               + "</tr>";
        $("#table-interests").DataTable().rows.add($(tr));            
        $('#table-interests').DataTable().draw();      
    });

    
    var usrID = getUrlParameter('user_id');
    if(jQuery.type(usrID) === "undefined") {
        $("#btn-update").hide();
        $("#div-photo").hide();
    } else {
        $("#btn-submit").hide();
        $.getJSON('/users/' + usrID, function(data) {
            $('#input-name').val(data.user.name);
            $('#input-alias').val(data.user.alias);
            $('#input-email').val(data.user.email);
            $('#input-latitude').val(data.user.location.latitude);
            $('#input-longitude').val(data.user.location.longitude);

            $("#img-photo").attr("src",data.user.photo);
            
            var tr = "";
            $.each(data.user.interests, function(key, val) {
                tr = "<tr>"
                   + "<td>" + val.category + "</td>"
                   + "<td>" + val.value + "</td>"
                   + "</tr>";
                $("#table-interests").DataTable().rows.add($(tr));            
            });
            $('#table-interests').DataTable().draw();        
        });
    }

    $("#btn-submit").click(function(e) {
	    //var postData = $("#user-form").serializeArray();
        var formMethod = "POST";
        var formURL = "/users";
        
        var $table = $("#table-interests"),
        rows = [],
        header = [];

        $table.find("thead th").each(function () {
            header.push($(this).html());
        });

        $table.find("tbody tr").each(function () {
            var row = {};
            $(this).find("td").each(function (i) {
                var key = header[i];
                var value = $(this).html();
                row[key] = value;
            });
            rows.push(row);
        });

        var sendInfo = {
			user: {
				name: $('#input-name').val(),
				alias: $('#input-alias').val(),
				email: $('#input-email').val(),
				interests: rows,
				location: {
					latitude: $('#input-latitude').val(),
					longitude: $('#input-longitude').val()
				}
			}
		};        
        
		$.ajax({
		    url : formURL,
			type: formMethod,
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(sendInfo),
			success:function(data, textStatus, jqXHR) {
				alert("User profile saved!");
			},
			error: function(jqXHR, textStatus, error) {
				alert(error);
			}
	    });
		e.preventDefault(); //STOP default action
		e.unbind(); //unbind. to stop multiple form submit.
	});

    $("#btn-update").click(function(e) {
        var formMethod = "PUT";
        var formURL = "/users/" + usrID;

        var $table = $("#table-interests"),
        rows = [],
        header = [];

        $table.find("thead th").each(function () {
            header.push($(this).html());
        });

        $table.find("tbody tr").each(function () {
            var row = {};
            $(this).find("td").each(function (i) {
                var key = header[i];
                var value = $(this).html();
                row[key] = value;
            });
            rows.push(row);
        });

        var sendInfo = {
			user: {
                //id: usrID,
				name: $('#input-name').val(),
				alias: $('#input-alias').val(),
				email: $('#input-email').val(),
				photo: "kumaaa",
				interests: rows,
				location: {
					latitude: $('#input-latitude').val(),
					longitude: $('#input-longitude').val()
				}
			}
		};

		$.ajax({
		    url : formURL,
			type: formMethod,
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(sendInfo),
			success:function(data, textStatus, jqXHR) {
                alert("User profile updated!");
			},
			error: function(jqXHR, textStatus, error) {
				alert(error);
			}
	    });
		e.preventDefault(); //STOP default action
		e.unbind(); //unbind. to stop multiple form submit.
	});

});

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

