<?php

use src\lib\Lang;

spl_autoload_register(function ($class) {
    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    if (file_exists($file))
        require $file;
});

$lang = new Lang();

$page['lang'] = $lang->getLang();

$translation = array_merge($lang->translate(), $lang->translate($page['name']));

?>
<!doctype html>
<html lang="<?= $page['lang']; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sylvester - <?= $translation['title']; ?></title>
    <link rel="icon" href="/static/img/favicon.ico">
    <link rel="stylesheet" href="/static/css/style.css">
    <?php if ($page['name'] === 'index') : ?>
        <script src="/game/phaser.js"></script>
        <script src="/game/main.js" type="module" defer></script>
        <script src="/static/js/app.js" type="module" defer></script>
    <?php endif; ?>
</head>
<body>
<header>
    <nav>
        <ul>
            <li><a href="/index.php" class="current"><?= $translation['home']; ?></a></li>
            <li><a href="/about.php"><?= $translation['about']; ?></a></li>
            <li><a href="/credits.php"><?= $translation['credits']; ?></a></li>
        </ul>
    </nav>
    <div id="univ-aside">
        <p><?= $translation['context']; ?></p>
        <img src="/static/img/lr_univ_logo.png" alt="Logo de l'Université de La Rochelle">
    </div>
</header>
</body>
</html>
