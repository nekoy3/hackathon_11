<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json; charset=UTF-8');
    
    require "DBManeger.php";
    $dbm = new DBManager();
    $dbm->disply_prefectures();
?>