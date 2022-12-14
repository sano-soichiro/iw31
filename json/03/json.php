<?php
$input = null;

if(isset($_POST["input"])){
    $input = $_POST["input"];
}

if(is_null($input)){
    header("Location: ./json.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON 1-3</title>
</head>
<body>
    <h1>JSON 1-3</h1>
    <div id="output1"><?= $input ?></div>
    <div id="output2"></div>
    <script src="./json.js"></script>
</body>
</html>