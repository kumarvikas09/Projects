<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package jagsness-theme
 */

get_header();
?>

<div class="container-fluid" id="single-<?php echo get_post_type();?>">
	<div class="container">
		<div class="row">
			<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/single/single', get_post_type() );
				endwhile; // End of the loop.
			?>
		</div>
	</div>
</div>
<?php get_footer();?>