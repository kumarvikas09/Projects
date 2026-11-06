<?php

/* ------ Register Custom Menus ------ */

if (!function_exists('register_custom_menus')) :
    function register_custom_menus()
    {
        register_nav_menus(
            array(
                'header' => __('Header Menu'),
                'footer'  => __('Footer Menu'),
            )
        );
    }
    add_action('after_setup_theme', 'register_custom_menus');
endif;

/* ------ Add List (li) Class In Custom Menu ------ */
// function add_li_class($classes, $item, $args, $depth)
// {
//     if ($args->theme_location == 'header') {
//         $classes[] = 'nav-item';
//     }
//     return $classes;
// }
// add_filter('nav_menu_css_class', 'add_li_class', 10, 4);


/* ------ Add Anchor (a) Class In Custom Menu ------ */
// function add_a_class($atts, $item, $args, $depth)
// {

//     if ($args->theme_location == 'header') {
//         $atts['class'] = "nav-link";
//     }
//     return $atts;
// }
// add_filter('nav_menu_link_attributes', 'add_a_class', 10, 4);
