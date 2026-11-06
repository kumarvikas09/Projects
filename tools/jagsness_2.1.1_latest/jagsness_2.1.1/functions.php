<?php
if ( ! defined( '_JN_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_JN_VERSION', '1.0.0' );
}


if ( ! function_exists( 'jagsness_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function jagsness_theme_setup() {
		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		// Logo support
        $defaults = array(
            'height'               => 100,
            'width'                => 400,
            'flex-height'          => true,
            'flex-width'           => true,
            'header-text'          => array( 'site-title', 'site-description' ),
            'unlink-homepage-logo' => false, 
        );

        add_theme_support( 'custom-logo', $defaults );

        /**
         * Enqueue scripts and styles.
         */

        function jagsness_scripts() {
            // check if woocommerce is activated in website start
            $ifWooActivate = false;
            if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
                $ifWooActivate = true;
            } else {
                $ifWooActivate = false;
            }
            // check if woocommerce is activated in website end

            wp_enqueue_style( 'jagsness-style', get_stylesheet_uri(), array(), _JN_VERSION );
            wp_enqueue_style( 'jagsness-bootstrap-style', get_template_directory_uri() . '/assets/css/bootstrap/bootstrap.min.css',false, _JN_VERSION,'all');
            wp_enqueue_style( 'jagsness-fontawesome-style', get_template_directory_uri() . '/assets/css/fontawesome/css/all.min.css',false, _JN_VERSION,'all');
            //wp_enqueue_style( 'jagsness-font-style', get_template_directory_uri() . '/assets/fonts/aeonik/stylesheet.css',false, _JN_VERSION,'all');

            // owl and slick both are linked use one of them at once 
            // wp_enqueue_style( 'jagsness-owl-style', get_template_directory_uri() . '/assets/css/owl/owl.min.css',false, _JN_VERSION,'all');
            //wp_enqueue_style( 'jagsness-swiper-style', get_template_directory_uri() . '/assets/css/swiper/swiper.min.css',false, _JN_VERSION,'all');
            //wp_enqueue_style( 'jagsness-slick-style', get_template_directory_uri() . '/assets/css/slick/slick.min.css',false, _JN_VERSION,'all');
            if($ifWooActivate){
                wp_enqueue_style( 'jagsness-woocommerce-style', get_template_directory_uri() . '/assets/css/woocommerce/style.css',false, _JN_VERSION,'all');
            }
            wp_enqueue_style( 'jagsness-theme-style', get_template_directory_uri() . '/assets/css/theme-style.css',false, _JN_VERSION,'all');

            wp_enqueue_script( 'jagsness-jquery-script', get_template_directory_uri() . '/assets/js/jquery/jquery.min.js', array(), _JN_VERSION, true );
            wp_enqueue_script( 'jagsness-bootstrap-script', get_template_directory_uri() . '/assets/js/bootstrap/bootstrap.bundle.min.js', array(), _JN_VERSION, true );

            // owl and slick both are linked use one of them at once  
            // wp_enqueue_script( 'jagsness-owl-script', get_template_directory_uri() . '/assets/js/owl/owl.min.js', array(), _JN_VERSION, true );
            //wp_enqueue_script( 'jagsness-swiper-script', get_template_directory_uri() . '/assets/js/swiper/swiper.min.js', array(), _JN_VERSION, true );
            //wp_enqueue_script( 'jagsness-slick-script', get_template_directory_uri() . '/assets/js/slick/slick.min.js', array(), _JN_VERSION, true );
            wp_enqueue_script( 'jagsness-theme-script', get_template_directory_uri() . '/assets/js/function.js', array(), _JN_VERSION, true );

        }
        add_action( 'wp_enqueue_scripts', 'jagsness_scripts' );
        
        /* register_nav_menus( array(
			'header' => __( 'Primary Menu', 'jagsness' ),
			'footer'  => __( 'Footer Menu', 'jagsness' ),
		) ); */
        
        
        /* ------ Admin Login Page Design ------ */
        require get_template_directory() . '/inc/theme/login_p_design.php';

        /* ------ Revert To Classic Editor & Classic Widgets ------ */
        require get_template_directory() . '/inc/theme/c_editor_c_widgets.php';

        /* ------ Register Custom Menus ------ */
        require get_template_directory() . '/inc/theme/menus.php';

        /* ------ Register Customizer ------ */
        require get_template_directory() . '/inc/theme/customizer.php';

        /* ------ Register Widgets ------ */
        require get_template_directory() . '/inc/theme/widgets.php';

        /* ------ Allow SVG ------ */
        require get_template_directory() . '/inc/theme/allow_svg.php';
        
        
        // Remove <p> and <br/> from Contact Form 7  (Uncomment this filter if you use CF7)
        //add_filter('wpcf7_autop_or_not', '__return_false');

        //Customizer CSS Disable
        add_action( 'customize_register', 'remove_customizer_additional_css', 999 );
        function remove_customizer_additional_css( $wp_customize ) {
            $wp_customize->remove_section( 'custom_css' );
        }
 
	}
endif;
add_action( 'after_setup_theme', 'jagsness_theme_setup' );


// add_action( 'after_setup_theme', 'enable_woocommerce_support' );

// function enable_woocommerce_support() {
// 	add_theme_support( 'woocommerce' );
// }

