<?php
/**
 * @var array $translation
 */
$page['name'] = basename(__FILE__, '.php');

include __DIR__ . '/templates/header.php';
?>
<main>
    <section>
        <h1>Mentions</h1>
        <p>Dans l'élaboration de ce projet, nous avons utilisé un certain nombre d'outils.<br>Phaser.js: Un module javascript permettant de créer un canvas dans lequel sont disposés plusieurs éléments (sprites, tiles) dans une scène pourvue de physique.<br>Apache: Serveur HTTP.<br>Tiled: Logiciel de création de map.<br>Aseprite: Logiciel de création de tiles/sprites.<br>Git: Logiciel de gestion de version.</p>
    </section>
    <section>
        <h1>Equipe</h1>
        <p>Simon:<br>Loukas:<br>Alonso:<br>Vincent:</p>
    </section>
</main>
<?php include __DIR__ . '/templates/footer.php'; ?>