<?php
class DBManager
{
    private function dbconnect()
    { //データベース接続
        $pdo = new PDO('mysql:host=localhost;dbname=nekodb;charset=utf8', 'root', 'example_pass');
        return $pdo;
    }

    function disply_areas()
    { //エリア全表示
        $pdo = $this->dbconnect();
        $sql = "SELECT * FROM areas";
        $ans = $pdo->query($sql);

        $data = array();

        foreach ($ans as $row) {
            array_push($data, array('area_id' => $row['area_id'], 'area_name' => $row['area_name']));
        }

        //arrayの中身をJSON形式に変換している
        $json_array = json_encode($data);

        print $json_array;
    }

    function disply_prefectures()
    { //都道府県情報全件取得
        $pdo = $this->dbconnect();
        $sql = "SELECT * FROM prefectures";
        $ans = $pdo->query($sql);

        $data = array();

        foreach ($ans as $row) {
            array_push($data, array(
                'prefectures_id' => $row['prefectures_id'], 'area_id' => $row['area_id'],
                'prefectures_name' => $row['prefectures_name'], 'latitube' => $row['latitube'], 'longitube' => $row['longitube'],
                'label' => $row['label'], 'charm_rank' => $row['charm_rank']
            ));
        }

        $json_array = json_encode($data);

        print $json_array;
    }

    function search_prefectures($label_data,$charm_rank_flg)
    { //ラベルによる絞り込み
        $pdo = $this->dbconnect();
        $data_num = count($label_data);
        $sql = "SELECT * FROM prefectures WHERE ";
        for ($i = 0; $i < $data_num; $i++) {
            if ($i == 0) {
                $sql = $sql . "label LIKE ? ";
                continue;
            }
            $sql = $sql . "AND label LIKE '?' ";
        }

        // if($charm_rank_flg==true){
        //     $sql = $sql."ODER"
        // }
        $sql = $sql . ";";

        $ps = $pdo->prepare($sql);

        for ($i = 0; $i < $data_num; $i++) {
            $ps->bindValue($i + 1, "%" . $label_data[$i] . "%", PDO::PARAM_STR);
        }

        $ps->execute();

        $search = $ps->fetchAll();

        if (!isset($search)) {
            return 0;
        }

        $data = array();

        foreach ($search as $row) {
            array_push($data, array(
                'prefectures_id' => $row['prefectures_id'], 'area_id' => $row['area_id'],
                'prefectures_name' => $row['prefectures_name'], 'latitube' => $row['latitube'], 'longitube' => $row['longitube'],
                'label' => $row['label'], 'charm_rank' => $row['charm_rank']
            ));
        }

        $json_array = json_encode($data);

        print $json_array;
    }
}
?>