<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>タイトル</title>
</head>
<body>
<?php
try{
    $pdo = new PDO(
        'mysql:host=neko3;dbname=nekodb;charset=utf8',
        'root',
        'example_pass'
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
}catch(PDOException $Exception){
    die('接続エラー：' .$Exception->getMessage());
}
try{
    $sql = "SELECT * FROM studydb.items";
    $stmh = $pdo->prepare($sql);
    $stmh->execute();
}catch(PDOException $Exception){
    die('接続エラー：' .$Exception->getMessage());
}
?>
<table><tbody>
    <tr><th>ID</th><th>商品名</th></tr>
<?php
    while($row = $stmh->fetch(PDO::FETCH_ASSOC)){
?>
    <tr>
        <th><?=htmlspecialchars($row['id'])?></th>
        <th><?=htmlspecialchars($row['name'])?></th>
    </tr>
<?php
    }
    $pdo = null;
?>
</tbody></table>
</body>
</html>