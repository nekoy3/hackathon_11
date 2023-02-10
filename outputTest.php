<?php
    $ans = $_POST["label"];

    $pdo = new PDO('mysql:host=localhost;dbname=nekodb;charset=utf8',
        'root','example_pass');
    $con_num = count($ans);
    $sql="SELECT prefectures_name FROM prefectures WHERE";
    for($i=0;$i<$con_num;$i++){
        if(){

        }
    }
        $ans=$pdo->query($sql);
    
    print_r($ans);
?>