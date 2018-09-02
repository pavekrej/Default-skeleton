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

// Pages
$config['pages'] = array(
  'homepage' => array(
      'title' => 'Úvod',
      'link' => 'homepage'
  ),
  '404' => array(
      'title' => 'Stránka nenalezena',
      'link' => '404'
  )
);
