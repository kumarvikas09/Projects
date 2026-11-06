<?php
/**
 * The template for displaying blog page 
 *
 * Blog Listing Page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package jagsness-theme
 */

 get_header(); ?>

<div class="container-fluid">

    <div class="container">
        <h4 style="text-align:center">Blog Listing Page</h4>
        <?php
        if ( have_posts() ) :
            /* Start the Loop */
            while ( have_posts() ) :
                the_post();
                get_template_part( 'template-parts/content', get_post_type() );
            endwhile;
            the_posts_navigation();
        else :
            get_template_part( 'template-parts/content', 'none' );
        endif;
        ?>
    </div>

</div><!-- #main -->

<?php get_footer(); ?>