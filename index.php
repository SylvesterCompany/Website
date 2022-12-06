<?php
spl_autoload_register(function ($class) {
    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    if (file_exists($file))
        require $file;
});
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HOME</title>
    <link rel="icon" href="assets/img/favicon.ico">
    <script src="game/phaser.js"></script>
    <script src="game/main.js" type="module" defer></script>
</head>
<body>
<?php include 'templates/header.php';?>
<canvas id="game"></canvas>
<a id="play-btn">Jouer</a>
<?php include 'templates/footer.php';?>
</body>
</html>
