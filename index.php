<?php
/**
 * @var array $translation
 */
$page['name'] = basename(__FILE__, '.php');

include __DIR__ . './templates/header.php';

?>
<main>
    <div id="title-container">
        <img id="logo" src="./static/img/game_logo.svg" alt="Logo du jeu Sylvester">
        <p id="subtitle"><?= $translation["subtitle"] ?></p>
        <a id="play-btn"><?= $translation["play_btn"] ?></a>
    </div>
    <div id="game-container" class="hidden">
        <div id="chatbox">
            <img class="bg" src="./static/img/chatbox.svg" alt="<?= $translation["dialog_bg_alt"] ?>">
            <span></span>
            <img class="enter" src="./static/img/enter.png" alt="<?= $translation["enter_alt"] ?>">
        </div>
        <div id="archive">
            <img class="bg" src="./static/img/archive.svg" alt="<?= $translation["archive_alt"] ?>">
            <h3></h3>
            <p></p>
            <span></span>
            <img class="enter" src="./static/img/enter.png" alt="<?= $translation["enter_alt"] ?>">
        </div>
        <canvas id="game"></canvas>
    </div>
</main>
<?php include __DIR__ . './templates/footer.php'; ?>
<div id="overlay"></div>