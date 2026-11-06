<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package jagsness-theme
 */

 


?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>


    <section class="jn_post_wrap">
        <div class="jn-featured-image">
            <img src="<?php the_post_thumbnail_url(); ?>" alt="">
        </div>

        <div class="jn-post-info">
            <ul>
                <li>
                    <?php the_date('d M Y'); ?>
                </li>
                <li>
                    <?php the_author(); ?>
                </li>
            </ul>
        </div>

        <div>
            <h1 class="jn-post-heading">
                <?php the_title(); ?>
            </h1>
        </div>
        
        <div class="jn-desc_wrap">
            <?php the_content();?>
        </div>
    </section>


</div><!-- #post-<?php the_ID(); ?> -->


