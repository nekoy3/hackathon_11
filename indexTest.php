<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="outputTest.php" method="POST">
        <h1>条件から絞り込む</h1>
        <input type="checkbox" name="label" value="グルメ">グルメ
        <input type="checkbox" name="label" value="海">海
        <br>
        <input type="submit" value="都道府県全表示">
    </form>

    <?php
        $pdo = new PDO('mysql:host=localhost;dbname=nekodb;charset=utf8',
        'root','example_pass');
        $sql = "SELECT * FROM areas";
        $ans=$pdo->query($sql);

        foreach($ans as $row){
            echo $row["area_name"]."<br>";
        }
    ?>
</body>
</html>