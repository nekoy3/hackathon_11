<?php
class DBManager
{
    private function dbconnect()
    { //データベース接続
        $pdo = new PDO('mysql:host=localhost;dbname=nekodb;charset=utf8','root','example_pass');
        return $pdo;
    }

    function disply_areas(){
        $pdo = $this->dbconnect();
        $sql = "SELECT * FROM areas";
        $ans=$pdo->query($sql);

        foreach($ans as $row){
            echo $row["area_name"]."<br>";
        }
    }
}
?>