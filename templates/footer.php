<?php

$names = ['Vincent Cohadon', 'Loukas Changeux', 'Simon Breil', 'Alonso Quispe'];

shuffle($names);
$last = array_pop($names);

$copyright = 'Copyright &copy ' . date('Y') . ' Sylvester - ' . implode(', ', $names) . ' et ' . $last;

?>

<footer>
    <span id="copyright">
        <?= $copyright; ?>
    </span>
</footer>

</body>
</html>