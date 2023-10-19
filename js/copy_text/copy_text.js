$("copy-button").on("click", function(){
var copyText = $("text-to--copy");
copyText.select();
copyText[0].setSelectonRange(0, 99999);
document.execCommand("copy");
$("copy-massage").html("متن کپی شد!")


});