$(document).ready(function(){
    
    var table = $('#table-interest').DataTable({});
    var usrID;

    $('#table-interest tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('danger') ) {
            $(this).removeClass('danger');
        } else {
            table.$('tr.danger').removeClass('danger');
            $(this).addClass('danger');
        }
    } );

    $.getJSON('/interests', function(data) {
        //iterate over the data and append a row
        var tr = "";
        $.each(data.interests, function(key, val) {
            tr = "<tr>"
               + "<td>" + val.category + "</td>"
               + "<td>" + val.value + "</td>"
               + "</tr>";
            $("#table-interest").DataTable().rows.add($(tr));            
        });

        $('#table-interest').DataTable().draw();
    });

});
