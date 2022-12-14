<?php
$array = [
    ["name" => "asada" , 
    "gender" => "男" ,
    "blog" => [array(
        "name" => "AsadaBlog" ,
        "published" => "2020-05-01" ,
        "url" => "https://test1.jp/" ,
        ),[
        "name" => "AsadaBlog" ,
        "published" => "2020-05-01" ,
        "url" => "https://test1.jp" ,
        ]]
    ],
    array("name" => "kawashima" ,
    "gender" => "男" ,
    "published" => "2020-06-11" ,
    "url" => "https://test2.jp" ,
    )
];

$enc_array = json_encode($array);
echo $enc_array;
?>