<?php
//spl_autoload_register(function ($class) {
//    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
//    if (file_exists($file))
//        require $file;
//});
//
$page['title'] = 'Accueil';
$page['name'] = 'index';
?>
<?php include __DIR__ . '/templates/header.php'; ?>
<main>
    <div id="title-container">
        <img id="logo" src="assets/img/game_logo.svg" alt="Logo du jeu Sylvester">
        <p id="subtitle">C'est l'histoire d'un écureuil<br>qui va (encore) faire le sale boulot.</p>
        <a id="play-btn">Jouer !</a>
    </div>
    <div id="game-container" class="hidden">
<!--        <img id="logo-mini" src="assets/img/game_logo_white.svg" alt="Logo du jeu Sylvester">-->
        <!--    Chat Box    -->
        <div id="chatbox">
            <img class="bg" src="/assets/img/chatbox.svg" alt="Boîte de dialogue">
            <span>Reviens, Sylvester ! Reviens, Sylvester ! Reviens, Sylvester ! Nous devons terminer ce combat. Nous devons !</span>
            <img class="enter" src="/assets/img/enter.png" alt="Entrée">
        </div>
        <canvas id="game"></canvas>
    </div>
</main>
<?php include __DIR__ . '/templates/footer.php'; ?>
<div id="overlay"></div>
