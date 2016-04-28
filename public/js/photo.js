$(document).ready(function() {
   
    var usrID = getUrlParameter('user_id');
    if(jQuery.type(usrID) === "undefined") {
        $("#btn-update").hide();
    } else {

    }

    $("#input-file").on('change',function(){
      var selectedFile = this.files[0];
      selectedFile.convertToBase64(function(base64){
           //alert(base64);
            $("#encoded-img").val(base64);
      }) 
    });

    $("#btn-submit").click(function(e) {
        var formMethod = "PUT";
        var formURL = "/users/" + usrID + "/photo";
        
        var sendInfo = {
			photo: $('#encoded-img').val()
		};        
        
		$.ajax({
		    url : formURL,
			type: formMethod,
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(sendInfo),
			success:function(data, textStatus, jqXHR) {
				alert(data.message);
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

File.prototype.convertToBase64 = function(callback){
    var FR= new FileReader();
    FR.onload = function(e) {
         callback(e.target.result)
    };       
    FR.readAsDataURL(this);
}



