<?php
$data = $_GET["send_data"];

$data = json_decode($data);
$ary = [];
foreach($data as $key => $value){
    $ary[$key] = $key . "=";
    if(is_array($value)){
        foreach($value as $subKey => $subValue){
            $ary[$key] = $ary[$key] . $subValue;
        }
    }else{
        $ary[$key] = $ary[$key] . $value;
    }
}
$string = implode("," , $ary);
$file_name = "json2-4.csv";
$fp = fopen($file_name , "a");
$current = file_get_contents($file_name);
$current = $string . "\n";
fwrite($fp , $current);
fclose($fp);

$send_ary = [];
foreach($data as $key => $value){
    $send_ary[$key] = "";
    if(is_array($value)){
        foreach($value as $subKey => $subValue){
            $send_ary[$key] = $send_ary[$key] . $subValue;
        }
    }else{
        $send_ary[$key] = $send_ary[$key] . $value;
    }
}

echo json_encode($send_ary);
?>