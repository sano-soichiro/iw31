<?php
$data = $_GET["send_data"];

$data = json_decode($data);
$ary = [];
foreach($data as $key => $value){
    $ary[$key] = $value;
}
$string = implode("," , $ary);
$file_name = "json2-3.csv";
$fp = fopen($file_name , "a");
$current = file_get_contents($file_name);
$current = $string . "\n";
fwrite($fp , $current);
fclose($fp);

echo json_encode($ary);
?>