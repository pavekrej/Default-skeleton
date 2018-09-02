<?php
if(!isPage404()) {
    $description = '';
    $keywords = '';
    $author = 'Pavel Krejčí | www.delamweby.cz (c) 2018';
    ?>
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="keywords" content="<?php echo $keywords; ?>">
    <meta name="author" content="<?php  echo $author; ?>">
    <meta name="robots" content="index, follow">
<?php } else { ?>
    <meta name="robots" content="noindex, nofollow">
<?php } ?>