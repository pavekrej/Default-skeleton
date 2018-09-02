<?php
/**
 * Config
 */

global $config;

// Config
$config['environmentDevelop'] = false;
$config['version'] = '1.0.1';

$config['versionSlug'] = '?v';
$config['themeUrl'] = '/';
$config['language'] = 'cs';
$config['pageName'] = 'Web';
$config['homepage'] = 'homepage';

// Pages
$config['pages'] = array(
  'homepage' => array(
      'title' => 'Úvod',
      'link' => 'homepage',
      'description' => 'Popisek',
      'keywords' => 'Klíčová slova'
  ),
  '404' => array(
      'title' => 'Stránka nenalezena',
      'link' => '404',
      'description' => '',
      'keywords' => ''
  )
);
