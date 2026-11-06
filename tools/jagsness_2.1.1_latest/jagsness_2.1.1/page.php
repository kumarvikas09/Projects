<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Glass_Cage
 */

get_header();
?>
<div data-pageName="<?php echo get_the_title(); ?>" class="singular_page" id="page-<?php echo sanitize_title_with_dashes(get_the_title()); ?>"><?php the_content(); ?></div>
<?php
get_footer();