<?php
/**
 * This Template part for displaying posts listing for selected category/tags/author/date/day/month
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package jagsness-theme
 */

?>

<?php if (is_author() ){ ?>

    <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h5 style="text-align:center">Selected Author posts Listing</h5>
    </div><!-- #post-<?php the_ID(); ?> -->

<?php }elseif(is_category()){ ?>

    <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h5 style="text-align:center">Selected Category posts Listing</h5>
    </div><!-- #post-<?php the_ID(); ?> -->

<?php }elseif(is_tag()){ ?>


    <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h5 style="text-align:center">Selected Tag posts Listing</h5>
    </div><!-- #post-<?php the_ID(); ?> -->

<?php }elseif(is_day()){ ?>


    <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h5 style="text-align:center">Selected Date posts Listing</h5>
    </div><!-- #post-<?php the_ID(); ?> -->

<?php }elseif(is_month()){ ?>


    <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h5 style="text-align:center">Selected Month posts Listing</h5>
    </div><!-- #post-<?php the_ID(); ?> -->

<?php }elseif(is_year()){ ?>


    <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h5 style="text-align:center">Selected Year posts Listing</h5>
    </div><!-- #post-<?php the_ID(); ?> -->

<?php } ?>
