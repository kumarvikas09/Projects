<?php
/**
 * The template for displaying front page
 *
 * (Home Page of Website)
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package jagsness-theme
 */
get_header();
?>

<div class="" id="home-page">
	<div class="container">
		<h4 style="text-align:center">Home Page</h4>
        <?php the_content(); ?>
        
        <?php include get_template_directory() . "/searchform.php";?>
	</div>
</div>
<?php get_footer();?>

