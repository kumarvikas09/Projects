<?php

if (!function_exists('theme_customize_register')) :
    function theme_customize_register($wp_customize)
    {
        /*------ Login Customizer Section ------*/
        require get_template_directory() . '/inc/theme/parts/login_customizer.php';

        // do your custom customizer code from below
    }
    add_action('customize_register', 'theme_customize_register');
endif;