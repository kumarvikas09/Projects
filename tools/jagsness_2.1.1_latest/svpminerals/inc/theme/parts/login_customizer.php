<?php 

$wp_customize->add_section('admin_design', array(
    'title'       => 'Admin Design',
    'description' => 'Admin Customizer',
    'priority'    => 1,
));

/*------ Admin background ------*/
$wp_customize->add_setting('admin_bg', array(
    'default'    => get_bloginfo('template_url') . '/images/logo.png',
    'capability' => 'edit_theme_options',
    'type'       => 'option',
));

$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'admin_bg', array(
    'label'    => 'Admin Background Image',
    'section'  => 'admin_design',
    'settings' => 'admin_bg',
)));


// background overlay
$wp_customize->add_setting('background_overlay', array(
    'default' => '#000000', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'background_overlay',
        array(
            'label'    => 'Background Overlay',
            'section'  => 'admin_design',
            'settings' => 'background_overlay',
        )
    )
);

/*------ Admin Form Box Background Color ------*/
$wp_customize->add_setting('form_box_bg', array(
    'default' => '#ffffff', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'form_box_bg',
        array(
            'label'    => 'Form Wrapper Background',
            'section'  => 'admin_design',
            'settings' => 'form_box_bg',
        )
    )
);

$wp_customize->add_setting('form_text_color', array(
    'default' => '#000000', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'form_text_color',
        array(
            'label'    => 'Label Color',
            'section'  => 'admin_design',
            'settings' => 'form_text_color',
        )
    )
);

$wp_customize->add_setting('form_field_background', array(
    'default' => '#dfdfdf', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'form_field_background',
        array(
            'label'    => 'Field Background',
            'section'  => 'admin_design',
            'settings' => 'form_field_background',
        )
    )
);




/*------ Login Buttons ------*/
$wp_customize->add_setting('login_buttons_background', array(
    'default' => '#000000', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'login_buttons_background',
        array(
            'label'    => 'Login Buttons Background',
            'section'  => 'admin_design',
            'settings' => 'login_buttons_background',
        )
    )
);

$wp_customize->add_setting('login_button_color', array(
    'default' => '#ffffff', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'login_button_color',
        array(
            'label'    => 'Login Buttons Color',
            'section'  => 'admin_design',
            'settings' => 'login_button_color',
        )
    )
);




/*------ Forgot and Other Buttons ------*/
$wp_customize->add_setting('buttons_background', array(
    'default' => '#ffffff', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'buttons_background',
        array(
            'label'    => 'Other Buttons Background',
            'section'  => 'admin_design',
            'settings' => 'buttons_background',
        )
    )
);


$wp_customize->add_setting('buttons_color', array(
    'default' => '#000000', // Default color
    'sanitize_callback' => 'sanitize_hex_color', // Sanitize the color input
));

$wp_customize->add_control(
    new WP_Customize_Color_Control(
        $wp_customize,
        'buttons_color',
        array(
            'label'    => 'Other Buttons Color',
            'section'  => 'admin_design',
            'settings' => 'buttons_color',
        )
    )
);

?>