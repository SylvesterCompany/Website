<?php
/**
 * @var array $translation
 */
$page['name'] = basename(__FILE__, '.php');

include __DIR__ . '/templates/header.php';
?>
<main>
    <section>
        <h1><?= $translation["motivation_title"] ?></h1>
        <p><?= $translation["motivation_content"] ?></p>
    </section>
    <section>
        <h1><?= $translation["specs_title"] ?></h1>
        <ul>
            <li>
                <p><?= $translation["specs_content_1"] ?></p>
            </li>
            <li>
                <p><?= $translation["specs_content_2"] ?></p>
            </li>
            <li>
                <p><?= $translation["specs_content_3"] ?></p>
            </li>
            <li>
                <p><?= $translation["specs_content_4"] ?></p>
            </li>
        </ul>
    </section>
</main>
<?php include __DIR__ . '/templates/footer.php'; ?>