<?php
/**
 * The single post template for Flexlider (used for preview only!).
 */
?>

<?php get_header(); ?>

<!-- MAIN PAGE CONTENT START -->   
<section class="page">
    <div class="container"> 

        <!-- flexslider start -->
        <div class="twelve columns offset-by-two">
            <div class="flexslider">
                <ul class="slides styled clearfix">
            
                    <?php 
                        $flex_query = new WP_Query( array( 'post_type' => 'slider_type', 'posts_per_page' => 20, 'order' => 'ASC' )); 
                        global $post;
                    ?> 
            
                    <?php if($flex_query->have_posts()) : while($flex_query->have_posts()) : $flex_query->the_post(); ?>
                                
                        <li>
                            <?php if ( has_post_thumbnail() ) { 
                                the_post_thumbnail('slider-thumbnail');
                            } else {
                                echo '<img src=" ' . get_template_directory_uri() . '/lib/images/photos/slide.png" alt="' . get_the_title() . '"  />';
                            } ?>
                            <?php echo get_post_meta($post->ID, 'slider-thumbnail', true); ?>
                            <?php $slider_meta_box = get_post_meta($post->ID, 'slider_caption_meta', true); ?>
                            <?php if($slider_meta_box != '') { ?>
                                <p class="flex-caption"><?php echo $slider_meta_box; ?></p>
                            <?php } ?>
                        </li>
                                            
                    <?php endwhile; endif; // END the Wordpress Loop ?>
                    
                </ul>
            </div>
        </div>
        <!-- flexslider end -->

    </div>    
</section> 
<!-- MAIN PAGE CONTENT END --> 

<?php get_footer(); ?>