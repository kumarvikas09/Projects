<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package jagsness-theme
 */

get_header();
?>

<div class="container-fluid" id="single-post">
	<div class="container">
        <h4 style="text-align:center">Archive Post Page</h4>
        <?php if ( have_posts() ) : 
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/archive/archive', get_post_type() );
			endwhile; // End of the loop.
		
        else :

			get_template_part( 'template-parts/archive/archive', 'none' );

		endif;
		?>
	</div>
</div>
<?php
get_footer();?>