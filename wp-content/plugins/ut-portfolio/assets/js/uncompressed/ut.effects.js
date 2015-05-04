/* <![CDATA[ */
(function($){
	
	"use strict";
    
    $(document).ready(function(){
		
        /* Lazy Load
		================================================== */
        var $imgs = $("img.portfolio-lazy");
    
        $imgs.lazyload({
            event : 'scroll',
			load : function() {
				
				$(this).animate({ opacity: 1 });
				$.waypoints("refresh");
				
			},
            failure_limit: Math.max($imgs.length - 1, 0)
        });
        
		/* Lightbox Effect
		================================================== */		
		$('a[data-rel^="utPortfolio"]').prettyPhoto({
			social_tools : false,
			deeplinking: false,
			default_width: 1024,
			allow_resize: true,
			markup: '<div class="pp_pic_holder"> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<div class="ppt">&nbsp;</div> \
											<p class="pp_description"></p> \
											{pp_social} \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',

		});
		
		/* Set Default Text Color for all elements */
		$(".ut-hover").each(function(index, element) {
            
			var text_color = $(this).closest('.ut-portfolio-wrap').data('textcolor');
			
			$(this).find(".ut-hover-layer").css({ "color" : text_color });
			$(this).find(".ut-hover-layer").find('.portfolio-title').attr('style', 'color: '+text_color+' !important');
			
        });		
		
		$(".ut-hover").mouseenter(function() {
			
			var hover_color   = $(this).closest('.ut-portfolio-wrap').data('hovercolor'),
				hover_opacity = $(this).closest('.ut-portfolio-wrap').data('opacity');

			$(this).find(".ut-hover-layer").css( "background" , "rgba(" + hover_color + "," + hover_opacity+ ")"  );
			$(this).find(".ut-hover-layer").css( "opacity" , 1 );			
			
		}).mouseleave(function() {
			
			$(this).find(".ut-hover-layer").css( "opacity" , 0 );
			
		});
					
		
		/* Portfolio Animation
		================================================== */
		var ut_is_animating = false;
		
		function update_portfolio_height( wrap , direction ) {
			
			if( !wrap ) {
				return;
			} 			
			
			var height = null;
			
			if( direction === 'prev' ) {
				height = $('#ut-portfolio-details-'+wrap).find('.active').prev().height();
			}
			
			if( direction === 'current' ) {
				height = $('#ut-portfolio-details-'+wrap).find('.active').height();
			}
			
			if( direction === 'next' ) {
				height = $('#ut-portfolio-details-'+wrap).find('.active').next().height();
			}
			
			$('#ut-portfolio-details-wrap-'+wrap).height( height + 30 );
			
		}
		
				
		/* Update the Portfolio Detail Navigation */
		function update_portfolio_navigation( wrap ) {
						
			if( !wrap ) {
				return;
			} 
			
			/* lets get the next and previous element */
			var prev = $('#ut-portfolio-details-'+wrap).find('.active').prev('.ut-portfolio-detail'),
				next = $('#ut-portfolio-details-'+wrap).find('.active').next('.ut-portfolio-detail');
			
			/* show or hide previous button */
			if( !prev.length ) {
				$('#ut-portfolio-details-wrap-'+wrap).find('.prev-portfolio-details').animate({ opacity: 0});
			} else {
				$('#ut-portfolio-details-wrap-'+wrap).find('.prev-portfolio-details').animate({ opacity: 1});
			}
			
			/* show or hide next button */ 
			if( !next.length ) {
				$('#ut-portfolio-details-wrap-'+wrap).find('.next-portfolio-details').animate({ opacity: 0});
			} else {
				$('#ut-portfolio-details-wrap-'+wrap).find('.next-portfolio-details').animate({ opacity: 1});
			}
			
			update_portfolio_navigation_position();
								
		}	
		
		
		function update_portfolio_navigation_position() {
			
			$('.ut-portfolio-details-navigation').each(function() {
                
				var $this 			= $(this),
					$parent 		= $this.parent(),
					$current 		= $parent.find(".active"),					
					media_height 	= $current.find(".ut-portfolio-media").height();
					
					$this.find('.next-portfolio-details').animate({top: media_height / 2 + 45 });
					$this.find('.prev-portfolio-details').animate({top: media_height / 2 + 45 });
					
            });
						
		}
		
		
		$(window).smartresize(function(){
			update_portfolio_navigation_position();
		});
		
		
		/* show portfolio detail */
		$(document).on("click", ".ut-portfolio-link", function(event) { 
						
			if( ut_is_animating ) {
				return false;
			}
			
			ut_is_animating = true;
									
			var portfolio_single_id = $(this).data('post'),
				portfolio_wrap    	= $(this).data('wrap'),
				$portfolio_loader 	= $('#ut-loader-' + portfolio_wrap ),
				$portfolio_wrap   	= $('#ut-portfolio-details-wrap-' + portfolio_wrap ),
				$portfolio_details  = $('#ut-portfolio-details-' + portfolio_wrap ),
				$portfolio_detail 	= $portfolio_wrap.find('#ut-portfolio-detail-' + portfolio_single_id ),
				section_width     	= $portfolio_wrap.closest('section').data('width'),
				pformat			  	= $portfolio_detail.data("format");
			
			
			$portfolio_loader.stop(true).fadeIn( 400 , function() {				
				
				$.scrollTo( $portfolio_wrap , 650 , {  easing: 'easeInOutExpo' , offset: -100 , 'axis':'y' , onAfter : function(){ 
										
					/* we need some extra padding for fullwidth layouts / sections */
					if( section_width !== 'centered' ) {
						$portfolio_detail.addClass('grid-container');
					}
					
					/* hide all portfolio items first */
					$('.ut-portfolio-detail').removeClass('active').hide();
					
					/* create single portfolio detail */
					$portfolio_detail.addClass('active').css("visibility" , "hidden").show().slideDown( 800 , 'easeInOutExpo' , function() {

						/* box holds a slider , so we need to "recall" it */
						if( pformat === 'gallery' ) {
							
							utInitFlexSlider( portfolio_single_id , function() {   
								
								$portfolio_loader.fadeOut( 400 , function() {
									
									/* activate wrap */
									$portfolio_wrap.addClass('show overflow-visible');
									
									/* now show the portfolio navigation*/
									$portfolio_wrap.find('.ut-portfolio-details-navigation').addClass('show').data( "single" , portfolio_single_id );
																		
									/* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										/* trigger scroll for lazy image load */
										$(window).trigger("scroll")
										
										/* reset animating global */
										ut_is_animating = false;
																				
									});
																		
								});
								
							});  
							
						} else if( pformat === 'video' ) {
							
							utInitVideoPlayer( portfolio_single_id , function() { 
								
								$portfolio_loader.fadeOut( 400 , function() {
									
									/* activate wrap */
									$portfolio_wrap.addClass('show overflow-visible');
																	
									/* now show the portfolio navigation*/
									$portfolio_wrap.find('.ut-portfolio-details-navigation').addClass('show').data( "single" , portfolio_single_id );
																		
									/* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										/* trigger scroll for lazy image load */
										$(window).trigger("scroll")
										
										/* reset animating global */
										ut_is_animating = false;
									
									});
									
								});
								
							}); 
							
						} else {
							
							utInitPortfolioImage( portfolio_single_id , function() { 
												
								$portfolio_loader.fadeOut( 400 , function() {
									
									/* activate wrap */
									$portfolio_wrap.addClass('show overflow-visible');
										
									/* now show the portfolio navigation*/
									$portfolio_wrap.find('.ut-portfolio-details-navigation').addClass('show').data( "single" , portfolio_single_id );
									
									/* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										/* trigger scroll for lazy image load */
										$(window).trigger("scroll")
										
										/* reset animating global */
										ut_is_animating = false;
									
									});
																		
								});
							
							}); 
							
						}
							
					});
									
					
				}});
			
			});
			
			event.preventDefault();
			
		});
		
		
		/* next portfolio item */
		$(document).on("click", ".next-portfolio-details", function(event) { 
			
			if( ut_is_animating ) {
				return false;
			}
			
			ut_is_animating = true;
						
			var portfolio_wrap              = $(this).data('wrap'),
                $portfolio_wrap   	        = $('#ut-portfolio-details-wrap-' + portfolio_wrap ),
                section_width     	        = $portfolio_wrap.closest('section').data('width'),
                $portfolio_details          = $('#ut-portfolio-details-' + portfolio_wrap ),
                $portfolio_loader 	        = $('#ut-loader-' + portfolio_wrap ),
                next_portfolio_single_id    = $portfolio_details.find('.active').next().data('post'),
                next_portfolio_pformat      = $portfolio_details.find('.active').next().data('format'),
				current_portfolio_single_id = $portfolio_details.find('.active').data('post'),
				current_portfolio_pformat   = $portfolio_details.find('.active').data('format'),
                $portfolio_detail 	        = $portfolio_details.find('#ut-portfolio-detail-' + next_portfolio_single_id );
            
			/* reset video on current portfolio */
			if( current_portfolio_pformat === 'video' ) {
				utResetVideo( current_portfolio_single_id );			
			}	
			
            /* we need some extra padding for fullwidth layouts / sections */
            if( section_width !== 'centered' ) {
                $portfolio_detail.addClass('grid-container');
            }
            			
			/* hide all current portfolio first */
			$('#ut-portfolio-detail-'+ current_portfolio_single_id ).removeClass('active').fadeOut( function(){	
								
				$portfolio_loader.stop(true).fadeIn( 400 , function() {
            							
                    /* create single portfolio detail */
                    $portfolio_detail.addClass('active').css("visibility" , "hidden").slideDown( 800 , 'easeInOutExpo' , function() {
						  
                        /* box holds a slider , so we need to "recall" it */
                        if( next_portfolio_pformat === 'gallery' ) {
                            
                            utInitFlexSlider( next_portfolio_single_id , function() {   
                                
                                $portfolio_loader.fadeOut( 400 , function() {
                                    
                                    /* update portfolio navigation*/
                                    $portfolio_details.find('.ut-portfolio-details-navigation').data( "single" , next_portfolio_single_id );
                                    
                                    /* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										ut_is_animating = false;
									
									});
                                    
                                });
                                
                            });  
                            
                        } else if( next_portfolio_pformat === 'video' ) {
                            
                            utInitVideoPlayer( next_portfolio_single_id , function() { 
                                
                                $portfolio_loader.fadeOut( 400 , function() {
                                                                                                        
                                    /* update portfolio navigation*/
                                    $portfolio_details.find('.ut-portfolio-details-navigation').data( "single" , next_portfolio_single_id );
                                    
                                    /* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										ut_is_animating = false;
									
									});
                                    
                                });
                                
                            }); 
                            
                        } else {
                             
                            utInitPortfolioImage( next_portfolio_single_id , function() { 
                                                
                                $portfolio_loader.fadeOut( 400 , function() {
                                                                        
                                    /* update portfolio navigation*/
                                    $portfolio_details.find('.ut-portfolio-details-navigation').data( "single" , next_portfolio_single_id );
                                                                    
                                    /* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										ut_is_animating = false;
									
									});
                                    
                                });
                             
                            });
                        
                        } /* end if */
                									
					});	
            
            	});
				
			});
						
			event.preventDefault();
			
		});
		
		
		/* prev portfolio item */
		$(document).on("click", ".prev-portfolio-details", function(event) { 
			
			if( ut_is_animating ) {
				return;
			}
			
			ut_is_animating = true;
			
			var portfolio_wrap              = $(this).data('wrap'),
                $portfolio_wrap   	        = $('#ut-portfolio-details-wrap-' + portfolio_wrap ),
                section_width     	        = $portfolio_wrap.closest('section').data('width'),
                $portfolio_details          = $('#ut-portfolio-details-' + portfolio_wrap ),
                $portfolio_loader 	        = $('#ut-loader-' + portfolio_wrap ),
                prev_portfolio_single_id    = $portfolio_details.find('.active').prev().data('post'),
                prev_portfolio_pformat      = $portfolio_details.find('.active').prev().data('format'),
				current_portfolio_single_id = $portfolio_details.find('.active').data('post'),
				current_portfolio_pformat   = $portfolio_details.find('.active').data('format'),
                $portfolio_detail 	        = $portfolio_details.find('#ut-portfolio-detail-' +prev_portfolio_single_id );
            
			/* reset video on current portfolio */
			if( current_portfolio_pformat === 'video' ) {
				utResetVideo( current_portfolio_single_id );			
			}
			
            /* we need some extra padding for fullwidth layouts / sections */
            if( section_width !== 'centered' ) {
                $portfolio_detail.addClass('grid-container');
            }
            						
			/* hide all current portfolio first */
			$('#ut-portfolio-detail-'+ current_portfolio_single_id ).removeClass('active').fadeOut( function(){
			
				$portfolio_loader.stop(true).fadeIn( 400 , function() {
									
					/* create single portfolio detail */
					$portfolio_detail.addClass('active').css("visibility" , "hidden").slideDown( 800 , 'easeInOutExpo' , function() {
					   
						/* box holds a slider , so we need to "recall" it */
						if( prev_portfolio_pformat === 'gallery' ) {
							
							utInitFlexSlider( prev_portfolio_single_id , function() {   
								
								$portfolio_loader.fadeOut( 400 , function() {
									
									/* update portfolio navigation*/
									$portfolio_details.find('.ut-portfolio-details-navigation').data( "single" , prev_portfolio_single_id );
																										
									/* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										ut_is_animating = false;
									
									});
																										
								});
								
							});  
							
						} else if( prev_portfolio_pformat === 'video' ) {
							
							utInitVideoPlayer( prev_portfolio_single_id , function() { 
								
								$portfolio_loader.fadeOut( 400 , function() {
																										
									/* update portfolio navigation*/
									$portfolio_details.find('.ut-portfolio-details-navigation').data( "single" , prev_portfolio_single_id );
																		
									/* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										ut_is_animating = false;
									
									});
																	
								});
								
							}); 
							
						} else {
							 
							utInitPortfolioImage( prev_portfolio_single_id , function() { 
												
								$portfolio_loader.fadeOut( 400 , function() {
																										
									/* update portfolio navigation*/
									$portfolio_details.find('.ut-portfolio-details-navigation').data( "single" , prev_portfolio_single_id );
																	
									/* now make portfolio detaials visible and adjust the portfolio navigation */
									$portfolio_detail.css("visibility" , "visible").animate({ opacity: 1 } , 400 , 'easeInOutExpo' , function() {
										
										/* update portfolio detail navigation */
										update_portfolio_navigation( portfolio_wrap );
										
										/* set details height */
										$portfolio_wrap.height( $portfolio_details.outerHeight() + 50 );
										
										ut_is_animating = false;
									
									});
																	
								});
							 
							});
						
						} /* end if */
															
					});	
				
				});
				
			});		
				
			event.preventDefault();
		
		});
		
		
		/* close portfolio detail */
		$(document).on("click", ".close-portfolio-details", function(event) { 
			
			if( ut_is_animating ) {
				return false;
			}
			
			ut_is_animating = true;
			
			var portfolio_wrap 		= $(this).data('wrap'),
				portfolio_single_id = $(this).parent().data("single"),
				portfolio_id    	= $(this).data('post'),
				pformat			  	= $('#ut-portfolio-detail-'+portfolio_id).data("format");
				
			/* hide navigation */
			$('#ut-portfolio-details-wrap-'+ portfolio_wrap ).find('.ut-portfolio-details-navigation').removeClass('show');
			
			/* fade portfolio out */
			$('#ut-portfolio-detail-'+ portfolio_single_id ).removeClass('active').animate({ opacity: 0 } , 200 , 'easeInOutExpo' , function(){
				
				/* collapse portfolio */
				$('#ut-portfolio-details-wrap-'+portfolio_wrap).removeClass('show').removeClass('overflow-visible');
				
				ut_is_animating = false;
				
			});
			
			
			/* reset video if needed */
			if( pformat === 'video' ) {
				utResetVideo( portfolio_single_id );
			}
			
			event.preventDefault();
		
		});
		
		
		function utResetVideo( portfolio_single_id ) {
		
			if( !portfolio_single_id ) {
				return;
			}
			
			$("#ut-video-call-"+portfolio_single_id).fadeOut( 400 , function() {
				
				/* remove video */
				$(this).html("");
				
			});
		
		}
				
		
		/* activate portfolio single player */
		function utInitVideoPlayer( postID , callback ) {
		
			if( !postID ) {
				return;
			}
			
			var $portfolio   = $('#ut-portfolio-detail-' + postID ),			
				ajaxURL = utPortfolio.ajaxurl;
			
			 $.ajax({
					type: 'POST',
					url: ajaxURL,
					data: {"action": "ut_get_portfolio_post", portfolio_id: postID },
					success: function(response) {
						
						$portfolio.find(".ut-video-call").show().html(response).fitVids();
						return false;
						
					},
					complete : function() {
						
						if (callback && typeof(callback) === "function") {   
							callback();  
						}
						
					}
					
			});
						
		}
		
		
        /* load portfolio single image */
        function utInitPortfolioImage( postID , callback ) {
         
			if(!postID) {
				return;
			}
            
            var $img = $("#ut-portfolio-detail-"+postID).find(".ut-load-me"),
                url = $img.data("original");
            
            /* image has not been set yet */
            if( !$img.attr('src') ) {
            
                $img.attr('src', url ).one('load', function() {
                    
                    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                                
                        alert('There is a broken image inside your portfolio: ' + $this.attr('src', url ) );
                    
                    } else {
                    
                        if (callback && typeof(callback) === "function") {   
                            callback();  
                        }
                    
                    }
                
                });
            
            /* image has been set, no need to load it again */
            } else {
                								
                if (callback && typeof(callback) === "function") {   
                    callback();  
                }
            
            }
           
        }
        
		/* activate portfolio single slider */
		function utInitFlexSlider( postID , callback ) {
			
			if(!postID) {
				return;
			}
			
			var elems = $('#portfolio-gallery-slider-'+postID).find('.ut-load-me'), count = elems.length;
			
			/* load images first */
			elems.each(function(element) {
				
				var $this = $(this),
					url = $this.data("original");
								
				$this.attr('src', url ).one('load', function() {
					
					if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
							
							alert('There is a broken image inside your portfolio: ' + $this.attr('src', url ) );
							
					} else {
						
						if ( !--count ) {
							
							$('#portfolio-gallery-slider-'+postID).flexslider({							
									
									animation: 'fade',
									controlNav: false,
									animationLoop: true,
									slideshow: false,
									smoothHeight: true,
									startAt: 0,
									after: function(){
										update_portfolio_navigation_position();
									}
														
							});
							
							if (callback && typeof(callback) === "function") {   
								callback();  
							}
						
						}
					
					}
					
				});				
			
			});		
		
		}
		
	});
    
})(jQuery);
 /* ]]> */	