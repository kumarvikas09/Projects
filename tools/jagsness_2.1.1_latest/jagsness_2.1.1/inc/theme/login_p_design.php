<?php
/* Admin Login Logo Link URL  */
if (!function_exists('admin_login')) :
    function admin_login()
    {
        return home_url();
    }
    add_filter('login_headerurl', 'admin_login');

    function login_page_design()
    {

        // get logo    
        $custom_logo_id = get_theme_mod( 'custom_logo' );
        $custom_logo_url = wp_get_attachment_image_url( $custom_logo_id , 'full' );
?>
<style type="text/css">
    

    * {
        box-sizing: border-box;
    }

    /* Logo Style */
    .login h1 a {
        background-image: url(<?php echo esc_url( $custom_logo_url ) ?>) !important;
        background-size: 30% !important;
        display: block !important;
        width: 100% !important;
        /* background-color: #000; */
        background-position: center center !important;
    }

    /* Main background */
    body.login {
        background: url(<?php echo get_option('admin_bg'); ?>);
        background-size: cover;
        background-position: center center;
        position: relative;
        z-index: 1;
        background-repeat: no-repeat;
    }

    body.login::before {
        content: "";
        background: <?php echo get_theme_mod( 'background_overlay' ); ?>;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        opacity: 0.5;
    }

    /* Login Form Wrapper */
    div#login {
        position: relative;
        z-index: 10;
        width: 600px;
        max-width: 90%;
    }

    div#login form{
        border-radius: 7px;
    }

    /* Form Labels */
    #loginform label {
        font-size: 16px;
        font-weight: 600;
        color: <?php echo get_theme_mod( 'form_text_color' ); ?>;
    }

    /* Form Fields */
    #loginform input[type="text"],
    #loginform input[type="password"]{
        height: 50px;
        border: 0px;
        background: <?php echo get_theme_mod( 'form_field_background' ); ?>;
        padding: 0 15px;
        outline: 0px!important;
    }

    #loginform input[type="text"]:focus,
    #loginform input[type="password"]:focus{
        outline:1px solid <?php echo get_theme_mod( 'background_overlay' ); ?>4f!important;
        border:0 !important;
        box-shadow: unset!important;
    }

    .login .button.wp-hide-pw {
        height: 50px;
    }

    /* Forgot Field */
    #loginform .forgetmenot{
        width: 100%;
    }

    #loginform p.forgetmenot label {
        position: relative;
        padding-left: 60px;
    }

    #loginform .forgetmenot label::before {
        position: absolute;
        left: 0;
        top: 2px;
        width: 49px;
        height: 24px;
        background: <?php echo get_theme_mod( 'form_field_background' ); ?>70;
        content: "";
        border-radius: 12px;
        border: 0px solid #000;
        transition: 0.5s ease;
    }

    #loginform .forgetmenot label::after {
        width: 20px;
        height: 20px;
        content: "";
        background: #ffffff;
        position: absolute;
        left: 3px;
        top: 4px;
        border-radius: 50%;
        transition: 0.5s ease;
    }

    #loginform .forgetmenot input{
        display: none;
    }

    #loginform .forgetmenot input:checked + label::after {
        left: 27px;
    }

    #loginform .forgetmenot input:checked + label::before {
        background: <?php echo get_theme_mod( 'form_field_background' ); ?>;
    }

    /* Submit Button */
    #loginform .submit{
        width: 100%;
    }

    #loginform .submit #wp-submit{
        width:100%;
        float: unset;
        height:50px;
        background:<?php echo get_theme_mod( 'login_buttons_background' ); ?>;
        color: <?php echo get_theme_mod( 'login_button_color' ); ?>;
        border:1px solid <?php echo get_theme_mod( 'login_buttons_background' ); ?>;
        margin-top:20px;
        font-size: 18px;
        transition:0.5s ease;
    }

    #loginform .submit #wp-submit:hover{
        background:#ffffff;
        color: <?php echo get_theme_mod( 'login_buttons_background' ); ?>;
    }

    /* Other Buttons */
    #nav,
    #backtoblog {
        margin: 0!important;
        padding: 0!important;
    }

    #nav a,
    #backtoblog a {
        width: 100%;
        background: <?php echo get_theme_mod( 'buttons_background' ); ?>;
        padding: 12px 25px!important;
        margin: 15px 0 0!important;
        font-size: 18px!important;
        text-align: center;
        color: <?php echo get_theme_mod( 'buttons_color' ); ?> !important;
        display: block;
        border-radius: 6px;
        transition: 0.5s ease;
    }

    #nav a:hover,
    #backtoblog a:hover {
        background: <?php echo get_theme_mod( 'login_buttons_background' ); ?>;
        color: <?php echo get_theme_mod( 'login_button_color' ); ?>!important;
    }

    body{
        content:"<?php echo get_theme_mod( 'form_box_bg' ); ?>";
        content:"<?php echo get_theme_mod( 'background_overlay' ); ?>";
        content:"<?php echo get_theme_mod( 'form_text_color' ); ?>";
        content:"<?php echo get_theme_mod( 'form_field_background' ); ?>";
        content:"<?php echo get_theme_mod( 'login_buttons_background' ); ?>";
        content:"<?php echo get_theme_mod( 'login_buttons_color' ); ?>";
        content:"<?php echo get_theme_mod( 'buttons_background' ); ?>";
        content:"<?php echo get_theme_mod( 'buttons_color' ); ?>";
    }


</style>
<?php
}
add_action('login_enqueue_scripts', 'login_page_design');
endif;