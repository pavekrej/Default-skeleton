<?php
/**
 * Functions
 */

// Version
function v($print = true) {
    global $config;
    $version = (isDev()) ? time(): $config['version'];
    if($print) {
        echo $config['versionSlug'] . '=' . $version;
        return '';
    } else {
        return $version;
    }
}

// Get component
function getComponent($componentName = '', $params = array(), $componentFile = 'index') {
    if(!empty($componentName)) {
        extract($params);
        require 'components/' . $componentName . '/' . $componentFile . '.php';
    }
}

// Pretty print
function pp($string) {
    print '<pre style="display: block; background-color: #000000; color: #ffffff; font-family: sans-serif; width: 100%; padding: 0.5rem 1rem;">';
    var_dump($string);
    print '</pre>';
}

// Get theme URL
function getThemeUrl() {
    global $config;
    $themeUrl = $config['themeUrl'];
    return $themeUrl;
}

// Get page link
function getPageLink($page) {
    global $config;
    $link = '?page=' . $config['pages'][$page]['link'];
    return $link;
}

// Get page title
function getPageTitle($page) {
    global $config;
    $link = $config['pages'][$page]['title'];
    return $link;
}

// Get source URL
function getSourceUrl($component, $source) {
    $env = (isDev()) ?  'develop' : 'production';
    $sourceUrl = 'build/' . $env . '/images/' . $component . '/images/' . $source;
    return $sourceUrl;
}

// Get page name
function getPageName() {
    global $config;
    $pageName = $config['pageName'];
    return $pageName;
}

// If is develop environment
function isDev() {
    global $config;
    $environment = $config['environmentDevelop'];
    return $environment;
}

// If is page #404
function isPage404() {
    return (isset($_GET['page']) && $_GET['page'] === '404') ? true : false;
}

// If is page
function isPage($page) {
    return (isset($_GET['page']) && $_GET['page'] === $page) ? true : false;
}

// Messages: http://jecas.cz/preklad
$l = array();
function l($text, $args = array()) {
    global $l;
    if (isset($l[$text])) {
        $text = $l[$text];
    }
    if (!empty($args)) {
        $text = vsprintf($text, $args);
    }
    return $text;
}