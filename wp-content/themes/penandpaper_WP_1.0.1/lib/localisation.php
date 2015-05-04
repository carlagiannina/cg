<?php
/**
 * THEME LOCALISATION
 */

load_theme_textdomain( 'pp', PP_THEME_DIR . '/lang' );

$locale = get_locale();

$locale_file = PP_THEME_DIR . "/lang/$locale.php";

if ( is_readable( $locale_file ) ) require_once( $locale_file );

?>