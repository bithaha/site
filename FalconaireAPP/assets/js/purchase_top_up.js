$(document).ready(function () {
	
	$('.top_up_amt').on('keyup', function(){
        this.value = this.value.replace(/[^0-9\.]/g,'');
  });
	
    var currentLocation = window.location;
    var path = currentLocation.pathname;
    var index = 0;
    index = path.lastIndexOf("index.php");
    //alert(index);
    if (index < 0) {
        index = path.lastIndexOf("user");
    }
    var lastpart = path.substring(0, index);
    var ajaxUrl = lastpart;
	jQuery.validator.addMethod('ge', function() {
		pack = $("#packamount").val();
		purchasewallet = $("#wallet_1balance").val();
		cashwallet = $("#wallet_2balance").val();
		leaderwallet = $("#wallet_3balance").val();
		credit_1 = $("#credit_1").val();
		credit_2 = $("#credit_2").val();
		credit_3 = $("#credit_3").val();
		var tot_amt = parseInt(credit_1) + parseInt(credit_2) + parseInt(credit_3);
	   return (tot_amt >= pack);
}, total_amt_insuff);
	jQuery.validator.addMethod('max_pamt', function() {
		pack = $("#packamount").val();
		purchasewallet = $("#wallet_1balance").val();
		cashwallet = $("#wallet_2balance").val();
		leaderwallet = $("#wallet_3balance").val();
		credit_1 = $("#credit_1").val();
		credit_2 = $("#credit_2").val();
		credit_3 = $("#credit_3").val();
		var tot_amt = parseInt(credit_1) + parseInt(credit_2) + parseInt(credit_3);
	   return (tot_amt == pack);
}, total_amt_over);
jQuery.validator.addMethod('ge1', function() {
		pack = $("#packamount").val();
		purchasewallet = $("#wallet_1balance").val();
		credit_1 = $("#credit_1").val();
	   return (parseInt(purchasewallet) >= parseInt(credit_1))
}, amt_insuff);
jQuery.validator.addMethod('ge2', function() {
		pack = $("#packamount").val();
		purchasewallet = $("#wallet_2balance").val();
		credit_1 = $("#credit_2").val();
	   return (parseInt(purchasewallet) >= parseInt(credit_1))
}, amt_insuff);
jQuery.validator.addMethod('ge3', function() {
		pack = $("#packamount").val();
		purchasewallet = $("#wallet_3balance").val();
		credit_1 = $("#credit_3").val();
	   return (parseInt(purchasewallet) >= parseInt(credit_1))
}, amt_insuff);
jQuery.validator.addMethod('min_credit', function() {
		pack = $("#packamount").val();
		credit_1 = $("#credit_1").val();
		return ((parseInt(pack*40/100) <= parseInt(credit_1)));
}, credit1_val_msg1);
jQuery.validator.addMethod('max_credit', function() {
		pack = $("#packamount").val();
		credit_1 = $("#credit_1").val();
		return ((parseInt(pack) >= parseInt(credit_1)));
}, credit1_val_max);
jQuery.validator.addMethod('min_credit_tw', function() {
		pack = $("#packamount").val();
		credit_2 = $("#credit_2").val();
		return ((parseInt(pack/2) >= parseInt(credit_2)));
}, credit2_val_msg2);
jQuery.validator.addMethod('max_credit_three', function() {
		pack = $("#packamount").val();
		credit_3 = $("#credit_3").val();
		return ((parseInt(pack*10/100) >= parseInt(credit_3)));
}, credit3_val_msg1);
	
    $("#update_profile").validate({
        errorElement: 'div',
        //errorClass: 'help-block',
        focusInvalid: false,
        // Specify the validation rules
        rules: {
            ptype: {required: true},
            top_up_amt: {required: true},
            packamount: {required: true},
            tac_code_common: {
                required: true,
                remote: {
                    url: ajaxUrl + "index.php/user/tacvaildate",
                    type: "post",
                    data: {
                        tac_code: function () {
                            return $("#tac_code_common").val();
                        }
                    }
                }
            },
            serial: {
                required: true,
                remote: {
                    url: ajaxUrl + "index.php/user/product/checkpromo",
                    type: "post",
                    data: {
                        code: function () {
                            return $("#code").val();
                        },
                        select_pack: function () {
                            return $('input:radio[name=select_pack]:checked').val();
                        }
                    }
                }
            },
            code: {
                required: true
            },
            credit_1 :{ 
				required : true,
				number: true,
				//min_credit: true,
				//max_credit: true,
				ge1:true,
			    ge: true,
				max_pamt:true,
				},
				credit_2 :{ 
				required : true,
				number: true,
				//min_credit_tw: true,
				ge2:true,
				ge: true,
				max_pamt:true,
				},
				credit_3 :{ 
				required : true,
				number: true,
				//max_credit_three: true,
				ge3:true,
				ge: true,
				max_pamt:true,
				},
				signature: {
				required: true,
			},
            tpin: {
                required: true
            },
        },
        messages: $val_messages,
		errorPlacement: function (error, element) {
            var name = $(element).attr("name");
            if (name == "select_pack") {
                error.appendTo($("#" + name + "_validate"));
            } else {
                error.insertAfter(element.parent());
            }
        },
        /*submitHandler: function(form,event) {
         event.preventDefault();
         if($(form).valid()){
         }	else 	{
         alert('Please enter all values');	return false;
         }
         }*/
    });
	
	
	
    var form = $("#update_profile");
    $("#update_profile").children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
		labels: $wizard_Buttons,
		preloadContent:true,
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex)
        {
			 if (newIndex < currentIndex) {
                return true;
            }
            if (newIndex == 1)
            {
			$('#ptype').change();
			}
			else if (newIndex == 2){
		var appname = $('#appname').val();
		var nid = $('#national_identity').val();
		var amount = $('#top_up_amt').val();
		$('.sign_up_info').html('Please review and sign contract');
		var lang = $('#lang').val();
		var principle = $('#principle').val();
		var tot_amt = parseFloat(principle) + parseFloat(amount);
		if(tot_amt >= 400000) { var percent = 1.25; }
		else if(tot_amt >= 200000) { var percent = 1; }
		else if(tot_amt >= 120000) { var percent = 0.875; }
		else if(tot_amt >= 40000) { var percent = 0.75; }
		else if(tot_amt >= 20000) { var percent = 0.5; }
		else if(tot_amt >= 12000) { var percent = 0.375; }
		else if(tot_amt >= 4000) { var percent = 0.25; }
		tot_amt = tot_amt.toFixed(2);
		percent = parseFloat(percent) * 4 * 12;
		$.ajax({
            type: "GET",
            url: ajaxUrl +'signup_contract/'+lang,
            success: function (result) {
                $('#su_contract').html(result);
				$('#su_contract').css({'overflow':'hidden'});
				$("#su_contract .inv_name").html(appname.toUpperCase());
				$("#su_contract .inv_id").html(nid.toUpperCase());
				$("#su_contract .amount").html(tot_amt+' AED');
				$("#su_contract .package_percent").html(percent);
            }
		});
			}
			else if (newIndex == 3)
            {
				if($('#signature').val() == '' || !$('#signature').val()){
					return false;
				}
                $("#fill1").html('');
                if (form.valid())
                {
                    var datastring = $(form).serialize();
                    $.ajax({
                        url: ajaxUrl + "index.php/user/product/select",
                        method: "POST",
                        data: datastring,
                        dataType: "json",
                        success: function (data)
                        {
							//console.log(data);
                            if (data.status == 'ok')
                            {
                                $("#fill1").html(data.contents);
								$('.p_tua').html('AED '+data.top_up_amt+'.00');
								$('.p_ct').html(data.current_tier);
								$('.p_nt').html(data.new_tier);
								$('.p_cp').html('AED '+data.current_principle+'.00');
								$('.p_np').html('AED '+data.new_principle+'.00');
                            }
                        },
                    });
                }
                else
                {
                    return false;
                }
            }
            if ($('#error_wallet').length != 1)
            {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            }
            else if (currentIndex < newIndex)
            {
                return false;
            }
            else
            {
                return true;
            }
        },
        onFinishing: function (event, currentIndex)
        {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex)
        {
            if ($(form).valid()) {
                var button = $(".wizard").find('a[href="#finish"]');
                // button.attr("href", '#finish-disabled');
                button.parent().addClass("disabled").css('display', 'none');
                /*  $('a[href="#finish"]').text('Processing...'); */
                var button2 = $(".wizard").find('a[href="#previous"]');
                // button.attr("href", '#finish-disabled');
                button2.parent().addClass("disabled").css('display', 'none');
                var datastring = $(form).serialize();
                $.ajax({
                    url: ajaxUrl + "index.php/user/product/update_top_up",
                    type: "POST",
                    data: datastring,
                    datatype: "json",
                    success: function (data)
                    {
                        var data = JSON.parse(data);
                        $("html, body").animate({scrollTop: 0}, "slow");
                        $('a[href="#finish"]').text($wizard_Buttons.submitbtn);
                        button.parent().addClass("disabled").css('display', 'none');
                        button2.parent().addClass("disabled").css('display', 'none');
                        button.parent().removeClass("disabled");
                        button2.parent().removeClass("disabled");
                        if (data.status == "OK") {
                            $('#alert').show();
                            $('#alert').removeClass().addClass("alert alert-success");
                            $('#icon').hide();
                            $('#message').html(data.msg);
                        }
                        else if (data.status == "Error")
                        {
                            button.parent().removeClass("disabled").css('display', 'block');
                            $('#alert').show();
                            $('#alert').removeClass().addClass("alert alert-danger");
                            $('#icon').hide();
                            $('#message').html(data.msg);
                        }
                        if (data.status == "OK") {
                            setTimeout(function () {
								data.redir_url = data.redir_url.replace('index.php/','');
                                window.location.assign(data.redir_url);
                            }, 2000);
                            return true;
                        } else {
                            return false;
                        }
                    },
                    error: function () {
                        $("#update_profile_submit").removeAttr('disabled');
                        $('#update_profile').before('<div class="alert alert-danger"><button data-dismiss="alert" class="close" type="button"><i class="ace-icon fa fa-times"></i></button><center>update not successfull</center><br></div>');
                        return false;
                    }
                });
            } else {
                alert('Please enter all values');
                return false;
            }
            //alert("Your Profile Update!");
        }
    });
    //Update mobile verification
    $("#update_mobile").validate({
        errorElement: 'div',
        //errorClass: 'help-block',
        focusInvalid: true,
        // Specify the validation rules
        rules: {
            phonecode: {
                required: true
            },
            mobile: {
                required: true
            },
            tac_code_common: {
                required: true,
                remote: {
                    url: ajaxUrl + "index.php/user/tacvaildate",
                    type: "post",
                    data: {
                        tac_code: function () {
                            return $("#tac_code_common").val();
                        }
                    }
                }
            }
        },
        // Specify the validation error messages
        messages: {
            phonecode: {
                required: "Please specify country code"
            },
            mobile: {
                required: "Please enter mobile number"
            },
            tac_code_common: {
                required: "Enter TAC Code",
                remote: jQuery.validator.format("Invalid TAC Code")
            }
        },
        errorPlacement: function (error, element) {
            var name = $(element).attr("name");
            if (name == "tac_code_common") {
                error.appendTo($("#" + name + "_validate"));
            } else {
                error.insertAfter(element.parent());
            }
        },
        /*submitHandler: function(form,event) {
         event.preventDefault();
         if($(form).valid()){
         }	else 	{
         alert('Please enter all values');	return false;
         }
         }*/
    });
    var form1 = $("#update_mobile");
    $("#update_mobile").children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            form1.validate().settings.ignore = ":disabled,:hidden";
            return form1.valid();
        },
        onFinishing: function (event, currentIndex)
        {
            form1.validate().settings.ignore = ":disabled";
            return form1.valid();
        },
        onFinished: function (event, currentIndex)
        {
            if ($(form1).valid()) {
                var datastring = $("#update_mobile").serialize();
                var button = $(".wizard").find('a[href="#finish"]');
                button.parent().addClass("disabled");
                $('a[href="#finish"]').text($wizard_Buttons.processbtn);
                var button2 = $(".wizard").find('a[href="#previous"]');
                button2.parent().addClass("disabled");
                $.ajax({
                    url: ajaxUrl + "index.php/user/verify_mobile",
                    type: "POST",
                    data: datastring,
                    datatype: "json",
                    success: function (data)
                    {
                        var data = JSON.parse(data);
                        $('a[href="#finish"]').text($wizard_Buttons.submitbtn);
                        button.parent().removeClass("disabled");
                        button2.parent().removeClass("disabled");
                        $("html, body").animate({scrollTop: 0}, "slow");
                        $("#update_mobile_submit").text('Update');
                        $('#update_mobile').before(data.msg);
                        if (data.status == "ok") {
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 2000);
                            return true;
                        } else {
                            return false;
                        }
                    },
                    error: function () {
                        $("#update_mobile_submit").text('Update');
                        $("#update_mobile_submit").removeAttr('disabled');
                        $('#update_mobile').before('<div class="alert alert-danger"><button data-dismiss="alert" class="close" type="button"><i class="ace-icon fa fa-times"></i></button><center>Mobile verifcation is not successfull</center><br></div>');
                        return false;
                    }
                });
            }
            else {
                alert('Please enter all values');
                return false;
            }
        }
    });
    $("#ptype").change(function () {
        $("#payment").html('');
        if ($("#ptype").val() != '')
        {
            ptype = $("#ptype").val();
            if ($("#ptype").val() == 2)
            {
                var button2 = $(".wizard").find('a[href="#next"]');
                button2.parent().hide();
            }
            else
            {
                var button2 = $(".wizard").find('a[href="#next"]');
                button2.parent().show();
            }
            var datastring = $(form).serialize();
            $.ajax({
                url: ajaxUrl + "index.php/user/product/combo?id=" + ptype,
                method: "POST",
                data: datastring,
                dataType: "json",
                success: function (data)
                {
                    if (data.check != '')
                    {
                        /*var button2 = $(".wizard").find('a[href="#next"]');
                         button2.parent().remove();*/
                    }
                    if (data.status == 'ok')
                    {
                        $("#payment").html(data.contents);
                    }
                },
            });
        }
    });
	
	
    $('.select_pack').on('ifChanged', function (event) {
        select_tr = $(this);
        //test.closest('tr').html('');
        $("#fill").html('');
        select_tr.closest('tr').clone().appendTo("#fill");
        $("#ptype option:eq(0)").prop("selected", true);
        $("#fill tr td:eq(4)").hide();
        $("#payment").html('');
    });
    $('#update_profile').on('click', '#check_promocode', function () {
        if ($('#code').val() != "" && $(form).valid())
        {
            $.ajax({
                dataType: "json",
                type: "POST",
                data: {
                    code: function () {
                        return $("#code").val();
                    },
                    select_pack: function () {
                        return $('input:radio[name=select_pack]:checked').val();
                    }
                },
                url: ajaxUrl + "index.php/user/product/checkpromo?id=2",
                success: function (response) {
                    if (response.status == 'success')
                    {
                        var button2 = $(".wizard").find('a[href="#next"]');
                        button2.parent().show();
                        $('.alert-success').remove();
                        $('.alert-danger').remove();
                        $('#code').after("<span class='alert-success'>"+response.msg+"</span>");
                        return true;
                    }
                    else {
                        var button2 = $(".wizard").find('a[href="#next"]');
                        button2.parent().hide();
                        $('.alert-danger').remove();
                        $('.alert-success').remove();
                        $('#code').after("<span class='alert-danger'>"+response.msg+"</span>");
                        return false;
                    }
                }
            });
        }
    });
});
function check()
{
    if ($("#wallet_1").val() >= 50 && $("#wallet_1").val() <= 100)
    {
        $("#wallet_2").val(100 - ($("#wallet_1").val()));
        $("#credit_1").val((($("#wallet_1").val()) * $("#packamount").val()) / 100)
        $("#credit_2").val(((100 - ($("#wallet_1").val())) * $("#packamount").val()) / 100)
    } else {
        $("#wallet_2").val('');
        $("#credit_1").val('');
        $("#credit_2").val('');
    }
}
function check_new()
{
    if ($("#credit_1").val() != '' && ($("#credit_1").val() >= ($("#packamount").val() / 2))
            && ($("#credit_2").val() <= ($("#packamount").val() / 2)) && ($("#credit_1").val() <= ($("#packamount").val())))
    {
        $("#wallet_1").val(($("#credit_1").val() * 100) / $("#packamount").val())
        $("#wallet_2").val(100 - ($("#wallet_1").val()));
        $("#credit_2").val($("#packamount").val() - $("#credit_1").val())
    }
    else
    {
        $("#wallet_1").val('');
        $("#wallet_2").val('');
        $("#credit_2").val('0');
    }
}
function check_new_one()
{
    if ($("#credit_1").val() != '' && ($("#credit_2").val() <= ($("#packamount").val() / 2)))
    {
        $("#credit_1").val($("#packamount").val() - $("#credit_2").val())
        $("#wallet_1").val(($("#credit_1").val() * 100) / $("#packamount").val())
        $("#wallet_2").val(100 - ($("#wallet_1").val()));
    }
    else
    {
        $("#wallet_1").val('');
        $("#wallet_2").val('');
        $("#credit_1").val('');
        //$("#credit_1").val('0');
    }
}

function check_payment(){
	$('form').valid();
}

$('document').ready(function(){
	$('.sign').click(function(){
        $('#signature-pad').show();
        signatureInit();
    });

});

function signatureInit() {
   var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

    // Adjust canvas coordinate space taking into account pixel ratio,
    // to make it look crisp on mobile devices.
    // This also causes canvas to be cleared.
    function resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }

    window.onresize = resizeCanvas;
    resizeCanvas();

    signaturePad = new SignaturePad(canvas);

    clearButton.addEventListener("click", function (event) {
        signaturePad.clear();
    });

    saveButton.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alert("Please provide signature first.");
        } else {
            $('#signature').val(signaturePad.toDataURL());
            $('#signature-pad').hide();
            $('.sign').parent().html('Please click next to continue');
        }
    });
}