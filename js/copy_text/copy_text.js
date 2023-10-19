document.getElementById("copy-button").addEventListener("click", function() {
    var copyText = document.getElementById("text-to-copy");
    var tempInput = document.createElement("input");
    tempInput.value = copyText.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    document.getElementById("copy-message").innerHTML = "متن کپی شد!";
});
