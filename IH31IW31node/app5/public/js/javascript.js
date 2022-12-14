"use strict"
$('#getbutton').click(function(e){
    $.ajax({
        type: "GET",
        url: "/users/"+$('#id').val()
    })
    .done(function (results) {
        $('#output').empty();

        const results_json = JSON.parse(results);
        console.log(results_json);
        for (let i=0;i<results_json.length;i++) {
            $('#output').append('GET:' + results_json[i].id + " " + results_json[i].email + " " + results_json[i].username + " " + results_json[i].password + '<br>');
        }
    })
    .fail(function(xhr , textStatus , errorThrown) {
        console.log("ajax通信に失敗しました");
    })
    .always(function (xhr) {

    });
});

$('#postbutton').click(function(e){
    let values = {
        id: $('#id').val(),
        email: $("#email").val(),
        username: $("#username").val(),
        password: $("#password").val()
    };
    $.ajax({
        type: "POST",
        data: values,
        url: "/users"
    })
    .done(function (results) {
        console.log(results);
        const results_json = JSON.parse(results);
        $('#output').append('POST:' + results_json.message + '<br>');
    })
    .fail(function(xhr , textStatus , errorThrown) {
        console.log("ajax通信に失敗しました");
    })
    .always(function (xhr) {

    });
});

$('#putbutton').click(function(e){
    let values = {
        email: $("#email").val(),
        username: $("#username").val(),
        password: $("#password").val()
    };
    $.ajax({
        type: "PUT",
        data: values,
        url: "/users/" + $("#id").val()
    })
    .done(function (results) {
        console.log(results);
        const results_json = JSON.parse(results);
        $('#output').append('PUT:' + results_json.message + '<br>');
    })
    .fail(function(xhr , textStatus , errorThrown) {
        console.log("ajax通信に失敗しました");
    })
    .always(function (xhr) {

    });
});

$('#deletebutton').click(function(e){
    $.ajax({
        type: "DELETE",
        url: "/users/" + $("#id").val()
    })
    .done(function (results) {
        console.log(results);
        const results_json = JSON.parse(results);
        $('#output').append('DELETE:' + results_json.message + '<br>');
    })
    .fail(function(xhr , textStatus , errorThrown) {
        console.log("ajax通信に失敗しました");
    })
    .always(function (xhr) {

    });
});
