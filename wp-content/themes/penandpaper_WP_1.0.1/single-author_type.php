<?php
/**
 * The single post template for displaying authors about section (used for preview only!)
 */
?>

<?php get_header(); ?>

<?php 	
	$authors_query = new WP_Query(array( 'post_type' => 'author_type', 'posts_per_page' =>'15') );
	global $post;
	$count = 1;
?>

<!-- MAIN PAGE CONTENT START -->   
<section class="page">
    <div class="container"> 

    <!-- tabs start // one for each pane  -->
    <?php if ( $authors_query->post_count > 1 ) { ?> 
        
        <ul class="tabs curly_brackets sixteen columns">
            <?php if ($authors_query->have_posts()) : while ($authors_query->have_posts()) : $authors_query->the_post(); ?>
            
                <li><a href="#"><?php the_title(); ?></a></li>
            
            <?php $count++; endwhile; endif; ?>
        </ul>        
        
    <?php } ?>
    <!-- tabs end --> 
    
    <div class="separator"></div>
    
    <!-- panes start -->
    <div class="panes">
    
        <?php	
            if ($authors_query->have_posts()) : while ($authors_query->have_posts()) : $authors_query->the_post(); 	
            $author_caption = get_post_meta($post->ID, 'authors_caption_meta', true); 
        ?>
          
            <!-- author pane start -->
            <div>
                <figure class="eight columns">
                
                    <?php if ( has_post_thumbnail() ) { ?>
                    
                        <div class="styled">
                          <?php the_post_thumbnail('author-thumbnail'); ?>
                        </div>
                        
                    <?php } else { ?>
                    
                          <div class="styled">
                              <?php echo '<img src=" ' . get_template_directory_uri() . '/lib/images/photos/author.png" alt="' . get_the_title() . '" />'; ?>
                          </div>
                          
                    <?php } ?>
                    
                    <?php if ( $author_caption !='' ) { ?>
                          <figcaption><?php echo $author_caption; ?></figcaption>
                    <?php } ?>
                    
                </figure>
                
                <div class="eight columns">
                    <h3><?php the_title(); ?></h3>
                    <?php the_content(); ?>
                </div>  
            </div>
            <!-- author pane end --> 
        
        <?php $count++; endwhile; endif; ?>  
        
    </div>   
    <!-- panes end -->

    </div>    
</section> 
<!-- MAIN PAGE CONTENT END --> 

<?php get_footer(); ?>