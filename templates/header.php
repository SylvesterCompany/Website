<?php
if (!isset($page['lang']))
    $page['lang'] = 'en';
?>
<!doctype html>
<html lang="<?=$page['lang'];?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?=$page['title'];?></title>
    <link rel="icon" href="assets/img/favicon.ico">
    <link rel="stylesheet" href="static/css/style.css">
    <?php if ($page['name'] == 'index') :?>
        <script src="game/phaser.js"></script>
        <script src="game/main.js" type="module" defer></script>
        <script src="static/js/app.js" type="module" defer></script>
    <?php endif;?>
</head>
<body>
<header>
    <nav>
        <ul>
            <li><a href="index.php" class="current">Accueil</a></li>
            <li><a href="about.php">À propos</a></li>
            <li><a href="credits.php">Crédits</a></li>
        </ul>
    </nav>
    <div id="univ-aside">
        <p>Réalisé dans le cadre<br>d'un&nbsp;projet&nbsp;universitaire</p>
        <img src="/assets/img/lr_univ_logo.png" alt="Logo de l'Université de La Rochelle">
    </div>
</header>
</body>
</html>
