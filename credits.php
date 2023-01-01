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
        <p>Dans l'élaboration de ce projet, nous avons utilisé un certain nombre d'outils.</p>
        <ul>
            <li>Phaser.js: Un module javascript permettant de créer un canvas dans lequel sont disposés plusieurs éléments (sprites, tiles) dans une scène pourvue de physique.</li>
            <li>Apache: Serveur HTTP.</li>
            <li>Tiled: Logiciel de création de map.</li>
            <li>Aseprite: Logiciel de création de tiles/sprites.</li>
            <li>Git: Logiciel de gestion de version.</li>
        </ul>

        <br><br><br><br><br>
    </section>
    <section>
        <h1>Équipe</h1>
        <ul>
            <li>
                <h2>Simon</h2>
                <p></p>
            </li>
            <li>
                <h2>Loukas</h2>
                <p></p>
            </li>
            <li>
                <h2>Alonso</h2>
                <p></p>
            </li>
            <li>
                <h2>Vincent (et son chat) :</h2>
                <p></p>
            </li>
        </ul>
    </section>
</main>
<?php include __DIR__ . '/templates/footer.php'; ?>