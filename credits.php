<?php
/**
 * @var array $translation
 */
$page['name'] = basename(__FILE__, '.php');

include __DIR__ . '/templates/header.php';
?>
<main>
    <section>
        <h1><?= $translation["mentions_title"] ?></h1>
        <p><?= $translation["mentions_content"] ?></p>
        <ul>
            <li>
                <h2><?= $translation["phaser_title"] ?></h2>
                <p><?= $translation["phaser_content"] ?></p>
            </li>
            <li>
                <h2><?= $translation["apache_title"] ?></h2>
                <p><?= $translation["apache_content"] ?></p>
            </li>
            <li>
                <h2><?= $translation["tiled_title"] ?></h2>
                <p><?= $translation["tiled_content"] ?></p>
            </li>
            <li>
                <h2><?= $translation["aseprite_title"] ?></h2>
                <p><?= $translation["aseprite_content"] ?></p>
            </li>
            <li>
                <h2><?= $translation["git_title"] ?></h2>
                <p><?= $translation["git_content"] ?></p>
            </li>
        </ul>
    </section>
    <section>
        <h1><?= $translation["team_title"] ?></h1>
        <p><?= $translation["team_content"] ?></p>
        <ul>
            <li>
                <h2><?= $translation["simon_title"] ?></h2>
                <p><?= $translation["simon_content"] ?></p>
            </li>
            <li>
                <h2><?= $translation["loukas_title"] ?></h2>
                <p><?= $translation["loukas_content"] ?></p>
            </li>
            <li>
                <h2><?= $translation["alonso_title"] ?></h2>
                <p><?= $translation["alonso_content"] ?></p>
            </li>
            <li>
                <h2><?= $translation["vincent_title"] ?></h2>
                <p><?= $translation["vincent_content"] ?></p>
            </li>
        </ul>
    </section>
</main>
<?php include __DIR__ . '/templates/footer.php'; ?>