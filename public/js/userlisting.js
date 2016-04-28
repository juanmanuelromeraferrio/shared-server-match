$(document).ready(function(){
    
    var table = $('#table-user').DataTable({});
    var usrID;

    $('#table-user tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('danger') ) {
            $(this).removeClass('danger');
        } else {
            table.$('tr.danger').removeClass('danger');
            $(this).addClass('danger');
        }
    } );

    $('#table-user').on('click', 'tbody tr', function () {
        usrID = table.row(this).data()[0];
    } );

    $.getJSON('/users', function(data) {
        //iterate over the data and append a row
        var href = "/user.html?user_id="
        var tr = "";
        $.each(data.users, function(key, val) {
            tr = "<tr href='" + href + val.user.id + "'>"
               + "<td style='display:none;'>" + val.user.id + "</td>"
               + "<td>" + val.user.name + "</td>"
               + "<td>" + val.user.alias + "</td>"
               + "<td>" + val.user.email + "</td>"
               + "<td>" + val.user.location.latitude + "</td>"
               + "<td>" + val.user.location.longitude + "</td>"
               + "</tr>";
            $("#table-user").DataTable().rows.add($(tr));            
        });

        $('#table-user').DataTable().draw();
    });

    $("#btn-view").click(function(e) {
        window.location.href = "/user.html?user_id=" + usrID;
	});

    $("#btn-upload").click(function(e) {
        window.location.href = "/pphoto.html?user_id=" + usrID;
	});

    $("#btn-delete").click(function(e) {
        var formMethod = "DELETE";
        var formURL = "/users/" + usrID;
        
		$.ajax({
		    url : formURL,
			type: formMethod,
			success:function(data, textStatus, jqXHR) {
				alert("User deleted!");
                table.row('.danger').remove().draw(false);
			},
			error: function(jqXHR, textStatus, error) {
				alert(error);
			}
	    });
		e.preventDefault(); //STOP default action
		e.unbind(); //unbind. to stop multiple form submit.
	});

});
