<?php
/**
 * The single post template for displaying portfolio item (used for preview only!).
 */
?>

<?php $portfolio_query = new WP_Query(array( 'post_type' => 'portfolio_type', 'posts_per_page' =>'-1') ); ?>

<?php get_header(); ?>

<!-- MAIN PAGE CONTENT START -->   
<section class="page">
    <div class="container"> 

	<?php if ( $portfolio_query->have_posts() ) : ?>
    
        <!-- portfolio preview start // fullsize images, captions and controls will be rendered here -->
        <div id="portfolio_preview" class="clearfix">
            <div id="contols_container" class="clearfix"> 
                <div id="controls" class="five columns"></div>
            </div>
            <div id="slideshow_container" class="sixteen columns clearfix"> 
                <div id="loading"></div>
                <div id="slideshow" class="styled"></div>
                <div id="caption" class="eleven columns clearfix"></div>
            </div>
        </div> 
        <!-- portfolio preview end -->  
    
    <?php endif; ?>  
            
    <!-- portfolio thumbnails start -->                       
    <div id="thumbs"> 
        <ul class="thumbs clearfix">
        
            <?php $portfolio_query = new WP_Query(array( 'post_type' => 'portfolio_type', 'posts_per_page' =>'-1') ); ?>
    
            <?php if ($portfolio_query->have_posts()) : while ($portfolio_query->have_posts()) : $portfolio_query->the_post(); ?>
            
                <?php 
                    $terms = get_the_terms( get_the_ID(), 'filter' ); // Get The Taxonomy 'Filter' Categories
                    $large_image =  wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), 'portfolio-large', false, '' ); 
                    $large_image = $large_image[0];
                    $portfolio_meta_box = get_post_meta($post->ID, 'portfolio_caption_meta', true);
                    global $count;
                ?>
        
                <li class="one-third column" data-id="id-<?php echo $count; ?>" data-type="<?php if ($terms != '') foreach ($terms as $term) { echo strtolower(preg_replace('/\s+/', '-', $term->name)). ' '; } ?>">
                   
                    <?php if ( has_post_thumbnail() ) { ?>
                    
                        <a class="thumb styled colorbox-off" href="<?php echo $large_image ?>" title="<?php the_title(); ?>">
                            <?php the_post_thumbnail('portfolio-thumbnail', array('title' => '')); ?>
                        </a>
                      
                    <?php } else { ?>
                      
                        <a class="thumb styled colorbox-off" href="<?php echo get_template_directory_uri() . '/lib/images/photos/portfolio_full.png' ?>" title="<?php the_title(); ?>">
                            <?php echo '<img src=" ' . get_template_directory_uri() . '/lib/images/photos/portfolio_thumb.png" alt="' . get_the_title() . '" />'; ?>
                        </a>               
                      
                    <?php } ?>	
                    
                    <div class="caption">
                        <h3><?php the_title(); ?></h3>
                        <?php if($portfolio_meta_box != '') { ?>
                            <p><?php echo $portfolio_meta_box; ?></p>
                        <?php } ?>
                    </div>
                        
                </li>
        
            <?php $count++; // Increase the count by 1 ?>		
            <?php endwhile; endif; // END the Wordpress Loop ?>
                    
        </ul>
    </div>
    <!-- portfolio thumbnails end -->

    </div>    
</section> 
<!-- MAIN PAGE CONTENT END --> 

<?php get_footer(); ?>