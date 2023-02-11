<?php
    require "DBManeger.php";
    $ans = $_POST["label"];
    
    print_r($ans);

    $dbm = new DBManager();
    echo "<br>";
    $dbm->search_prefectures($ans);
?>