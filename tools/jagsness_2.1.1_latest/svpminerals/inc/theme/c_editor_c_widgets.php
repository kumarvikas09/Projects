<?php

/* Disable Gutenberg Block Editor */
add_filter('use_block_editor_for_post', '__return_false', 10);

/* Disable Widgets Block Editor */
add_filter('use_widgets_block_editor', '__return_false');

/* function classic_widget()
{
    remove_theme_support('widgets-block-editor');
}
add_action('after_setup_theme', 'classic_widget'); */
