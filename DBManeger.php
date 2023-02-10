<?php
class DBManager
{
    private function dbconnect()
    { //データベース接続
        $pdo = new PDO('mysql:host=localhost;dbname=nekodb;charset=utf8','root','example_pass');
        return $pdo;
    }

    function disply_areas()
    {//エリア全表示
        $pdo = $this->dbconnect();
        $sql = "SELECT * FROM areas";
        $ans=$pdo->query($sql);

        foreach($ans as $row){
            echo $row["area_name"]."<br>";
        }
    }

    function search_prefectures($label_data)
    {//ラベルによる絞り込み
        $pdo = $this->dbconnect();
        $data_num = count($label_data);
        $sql = "SELECT * FROM prefectures WHERE";
        for($i=0;$i<$data_num;$i++){
            if($i==0){
                $sql = $sql . "label LIKE ? ";
                continue;
            }
            $sql = $sql . "AND label LIKE '?' ";
        }
        $sql = $sql.";";

        $ps = $pdo->prepare($sql);

        for ($i = 0; $i < $data_num; $i++) {
            $ps->bindValue($i + 1,"%".$label_data[$i]."%", PDO::PARAM_STR);
        }

        $ps->execute();

        $search = $ps->fetchAll();

        if (!isset($search)) {
            return 0;
        }

        foreach($search as $after){
            echo $after["prefectures_name"];
        }

        echo $sql;

        
    }
}
?>