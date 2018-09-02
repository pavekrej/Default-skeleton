<?php
/**
 * Web
 */

include_once 'app/config.php';
include_once 'app/functions.php';
include_once 'app/langs/' . $config['language'] . '.php';
?>
<!DOCTYPE HTML>
<html lang="<?php echo $config['language']; ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="<?php echo getPageName(); ?>">
    <title><?php echo (!isPage404()) ?  getPageName() : l('NOT_FOUND'); ?></title>
    <?php
    $vendorsSource = (isDev()) ? 'develop/vendors/style.css' : 'production/vendors/style.min.css';
    $styleSource = (isDev()) ? 'develop/css/style.css' : 'production/css/style.min.css';
    ?>
    <link href="<?php echo getThemeUrl(); ?>favicon.ico<?php v(); ?>" rel="icon">
    <link href="<?php echo getThemeUrl(); ?>build/<?php echo $vendorsSource; ?><?php v(); ?>" rel="stylesheet">
    <link href="<?php echo getThemeUrl(); ?>build/<?php echo $styleSource; ?><?php v(); ?>" rel="stylesheet">
    <link href="<?php echo getThemeUrl(); ?>humans.txt" rel="author">
    <?php getComponent('meta'); ?>
</head>
<body class="no-js <?php echo $config['language']; ?>">
    <script>document.body.className=document.body.className.replace(/no-js/,'js');</script>
    <?php
    // Header
    getComponent('header');
    ?>

    <?php
    // Content
    $template = 'homepage';
    if(isset($_GET['page']) && !empty($_GET['page'])) {
        $template = $_GET['page'];
    }
    ?>
    <div class="content">
        <?php include_once 'templates/' . $template . '.php'; ?>
    </div>

    <?php
    // Footer
    getComponent('footer');
    ?>

    <?php
    $vendorsSource = (isDev()) ? 'develop/vendors/script.js' : 'production/vendors/script.min.js';
    $scriptSource = (isDev()) ? 'develop/js/script.js' : 'production/js/script.min.js';
    ?>
    <script src="<?php echo getThemeUrl(); ?>build/<?php echo $vendorsSource; ?><?php v(); ?>"></script>
    <script src="<?php echo getThemeUrl(); ?>build/<?php echo $scriptSource; ?><?php v(); ?>"></script>
</body>
</html>