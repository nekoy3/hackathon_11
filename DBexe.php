<?php
    try{
        $pdo = new PDO("myspl:host=neko3; dbname=nekodb; charset=utf8",
                        "root","example_pass");
        $sql=$_POST["sql"];
        $res=$pdo->query($sql);
    }catch(PDOException $e){
        echo $e->getMessage();
    }
    $sql=null;
?>
<a href="./DBinsert.html">戻る</a>