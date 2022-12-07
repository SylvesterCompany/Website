<?php
//spl_autoload_register(function ($class) {
//    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
//    if (file_exists($file))
//        require $file;
//});
//?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Accueil</title>
    <link rel="icon" href="assets/img/favicon.ico">
    <link rel="stylesheet" href="static/css/style.css">
    <script src="game/phaser.js"></script>
    <script src="game/main.js" type="module" defer></script>
    <script src="static/js/app.js" type="module" defer></script>
</head>
<body>
<?php include 'templates/header.php'; ?>
<main>
    <div id="title-container">
        <img id="logo" src="assets/img/game_logo.svg" alt="Logo du jeu Sylvester">
        <p id="subtitle">C'est l'histoire d'un écureuil<br>qui va (encore) faire le sale boulot.</p>
        <a id="play-btn">Lancer le jeu</a>
    </div>
    <div id="game-container" class="hidden">
        <img id="logo-mini" src="assets/img/game_logo_white.svg" alt="Logo du jeu Sylvester">
        <canvas id="game"></canvas>
    </div>
</main>
<?php include 'templates/footer.php'; ?>
</body>
</html>
