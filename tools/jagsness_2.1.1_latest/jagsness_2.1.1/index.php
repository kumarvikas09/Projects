<?php
/**
 * The template for displaying all inner pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package jagsness-theme
 */

 get_header(); ?>

<div class="container-fluid">

    <div class="container">
        <h1 style="text-align:center">Index</h1>
        <?php
        if ( have_posts() ) :
            if ( is_home() && ! is_front_page() ) :
                ?>
            <header>
                <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
            </header>
            <?php
            endif;

            /* Start the Loop */
            while ( have_posts() ) :
                the_post();

                /*
                 * Include the Post-Type-specific template for the content.
                 * If you want to override this in a child theme, then include a file
                 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
                 */
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