$(function(){
    $.ajax({
        type: "GET",
        url: "./json.php",
        data: "json",
    })
    .done(function(data){
        const output_json = JSON.stringify(data);
        document.getElementById("output2").innerHTML = output_json;
        console.log("aa");
    })
})