<?php

// Show Widgets Sidebar
if (!function_exists('widgets_sidebar')) :
	function widgets_sidebar()
	{
		register_sidebar(array(
			'name'          => __('Footer 1', 'custom_theme'),
			'id'            => 'footer-1',
			'description'   => __('This is First Footer Widget', 'custom_theme'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widgettitle">',
			'after_title'   => '</h2>',
		));
		register_sidebar(array(
			'name'          => __('Footer 2', 'custom_theme'),
			'id'            => 'footer-2',
			'description'   => __('This is Second Footer Widget', 'custom_theme'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widgettitle">',
			'after_title'   => '</h2>',
		));
		register_sidebar(array(
			'name'          => __('Footer 3', 'custom_theme'),
			'id'            => 'footer-3',
			'description'   => __('This is third Footer Widget', 'custom_theme'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widgettitle">',
			'after_title'   => '</h2>',
		));
		register_sidebar(array(
			'name'          => __('Footer 4', 'custom_theme'),
			'id'            => 'footer-4',
			'description'   => __('This is Fourth Footer Widget', 'custom_theme'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widgettitle">',
			'after_title'   => '</h2>',
		));
		register_sidebar(array(
			'name'          => __('Blog Sidebar', 'custom_theme'),
			'id'            => 'blog_sidebar',
			'description'   => __('This is Blog Sidebar Widget', 'custom_theme'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widgettitle">',
			'after_title'   => '</h2>',
		));
	}
	add_action('widgets_init', 'widgets_sidebar');
endif;
