<?php

    /*
    Plugin Name: Shortcode Empty Paragraph Fix
    Plugin URI: http://www.johannheyne.de/wordpress/shortcode-empty-paragraph-fix/
    Description: This plugin fixes the empty paragraphs using shortcodes
    Author URI: http://www.johannheyne.de
    Version: 0.2
    Put this in /wp-content/plugins/ of your Wordpress installation.
    If you dont want to fix this problem with a plugin, then simply copy the code to your function.php file in the themefolder.
    */

    function shortcode_empty_paragraph_fix( $content ) {

        $array = array (
            '<p>[' => '[',
            ']</p>' => ']',
            ']<br />' => ']'
        );

        $content = strtr( $content, $array );

        return $content;
    }

    add_filter( 'the_content', 'shortcode_empty_paragraph_fix' );

?>