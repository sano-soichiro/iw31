<?php
switch($_SERVER["REQUEST_METHOD"]){
    case "GET":
        if(empty(($_GET['number']))){
            $num = 1;
        }else {
            $num = $_GET["number"];
        }
        if($num<1 or $num>=10){
            http_response_code(400);
            echo "範囲外です";
            exit;
        }
        $filepath = "enquete.csv";
        $i = 0;
        if(($handle = fopen($filepath , "r")) !== false){
            while(($line = fgetcsv($handle , 0 , ",")) !== false){
                if($i < $num){
                    foreach($line as $key => $data){
                        $data_substance = explode("=" , $data);
                        $array[$data_substance[0]] = $data_substance[1];
                    }
                    $records[] = $array;
                    $i++;
                }else{
                    break;
                }
            }
            fclose($handle);
        }
        http_response_code(200);
        echo json_encode($records);
        break;
    case "POST":
        $data = file_get_contents("php://input");

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
        $file_name = "enquete.csv";
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

        break;
}
?>