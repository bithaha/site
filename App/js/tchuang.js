//弹窗
$(function () {

    $('#cancelform').submit(function (e) {
        return false;
    });

    //弹出层调用语句
    $('#canceltrigger').leanModal({
        top: 110,
        overlay: 0.45,
        closeButton: ".hidemodal"
    });
	
    

    $('#smqsform').submit(function (e) {
        return false;
    });

    //弹出层调用语句
    $('#smqstrigger').leanModal({
        top: 110,
        overlay: 0.45,
        closeButton: ".hidemodal"
    });

    $('#queryorderform').submit(function (e) {
        return false;
    });

    //弹出层调用语句
    $('#queryordertrigger').leanModal({
        top: 110,
        overlay: 0.45,
        closeButton: ".hidemodal"
    });

    $('#pjsmform').submit(function (e) {
        return false;
    });

    //弹出层调用语句
    $('#pjsmtrigger').leanModal({
        top: 110,
        overlay: 0.45,
        closeButton: ".hidemodal"
    });

    $('#smqsform').submit(function (e) {
        return false;
    });

    //弹出层调用语句
    $('#smqstrigger').leanModal({
        top: 110,
        overlay: 0.45,
        closeButton: ".hidemodal"
    });

    $('#ljqdform').submit(function (e) {
        return false;
    });

    //弹出层调用语句
    $('#ljqdtrigger').leanModal({
        top: 110,
        overlay: 0.45,
        closeButton: ".hidemodal"
    });

    	$('#smsjform').submit(function(e){
		return false;
	});
	
	//弹出层调用语句
	$('#smsjtrigger').leanModal({
		top:110,
		overlay:0.45,
		closeButton:".hidemodal"
	});
});
