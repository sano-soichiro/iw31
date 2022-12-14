<?php
$ary_data = $_POST["value"];

$ary_data = json_decode($ary_data);
$string = implode("," , $ary_data);
$file_name = "json2-2.csv";
$fp = fopen($file_name , "a");
$current = file_get_contents($file_name);
$current = $string . "\n";
fwrite($fp , $current);
fclose($fp);

echo json_encode($ary_data);
?>