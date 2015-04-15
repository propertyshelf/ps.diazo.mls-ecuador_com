function portletform(){
    $("body").addClass("body_portlet_form");
    $( ".portletStaticText .portletItem .portlet_contact" ).each(function( index ) {
        myparent = $(this).parent().parent();
        myparent.addClass("portlet_form");
    });
}

function pos_fix_for_portlet_form(){
    portletform = $( "body .global-wrapper #portal-columns .portlet_form" );
    $(window).scroll(function(){
        if ($(window).scrollTop() > 80){
            $(portletform).addClass('pos_fix');
        } else if ($(window).scrollTop() < 80){
            $(portletform).removeClass('pos_fix');
        }
    });
}

function display_portlet_form(){
    var portlet = $( "body #content article" ).hasClass( "development" );

    if (portlet == true){
        console.log("Yes this site true");
    }
    else{
        $('#portal-column-two').hide();
        $('body').addClass('development_site');
        $('#portal-column-content').removeClass('width-3:4');
        $('#portal-column-content').addClass('width-full');

    }
}

function update_search_mask_label(){
    var vars_en = {
    'form-widgets-listing_type-0': 'Residential for Sale',
    'form-widgets-listing_type-1': 'Land for Sale',
    'form-widgets-listing_type-2': 'Commercial for Sale',
    'form-widgets-listing_type-3': 'Residential for Lease',
    'form-widgets-listing_type-4': 'Commercial for Lease',
    'location': 'Location',
    'min':'Min',
    'max':'Max'
    };
    var vars_es = {
    'form-widgets-listing_type-0': 'Residencia para Venta',
    'form-widgets-listing_type-1': 'Tierra para Venta',
    'form-widgets-listing_type-2': 'Comercial para Venta',
    'form-widgets-listing_type-3': 'Residencia para Alquiler',
    'form-widgets-listing_type-4': 'Comercial para Alquiler',
    'location': 'Ubicación',
    'min':'Bajo',
    'max':'Alto'
};
    var lang = get_language();
    var foo;

    if (lang == 'es'){
        foo = vars_es;
    }
    else{
        foo = vars_en;
    }

 /* Prepare ListingTypes*/
 if($('#home-search #formfield-form-widgets-listing_type').length>0){
    $('#home-search #formfield-form-widgets-listing_type').addClass('fancycheckbox');
    $('#home-search #formfield-form-widgets-listing_type input[type="checkbox"]').addClass('regular-checkbox');

    /* set labels with new values*/
    $('#home-search label[for="form-widgets-listing_type-0"] span.label').text(foo['form-widgets-listing_type-0']);
    $('#home-search label[for="form-widgets-listing_type-1"] span.label').text(foo['form-widgets-listing_type-1']);
    $('#home-search label[for="form-widgets-listing_type-2"] span.label').text(foo['form-widgets-listing_type-2']);
    $('#home-search label[for="form-widgets-listing_type-3"] span.label').text(foo['form-widgets-listing_type-3']);
    $('#home-search label[for="form-widgets-listing_type-4"] span.label').text(foo['form-widgets-listing_type-4']);


    $('#home-search label[for="form-widgets-listing_type-0"]').after($('#home-search label[for="form-widgets-listing_type-0"] span.label:first'));
    $('#home-search label[for="form-widgets-listing_type-1"]').after($('#home-search label[for="form-widgets-listing_type-1"] span.label:first'));
    $('#home-search label[for="form-widgets-listing_type-2"]').after($('#home-search label[for="form-widgets-listing_type-2"] span.label:first'));
    $('#home-search label[for="form-widgets-listing_type-3"]').after($('#home-search label[for="form-widgets-listing_type-3"] span.label:first'));
    $('#home-search label[for="form-widgets-listing_type-4"]').after($('#home-search label[for="form-widgets-listing_type-4"] span.label:first'));

    $('#home-search #form-widgets-price_min').attr('placeholder', foo['min']);
    $('#home-search #form-widgets-price_max').attr('placeholder', foo['max']);

    // disable form warnings
    $('form').removeClass('rowlike enableUnloadProtection');

 }
 /*simulate label behavior in span*/
    $('#home-search .fancycheckbox span.label').click(function(self) {
        /*a label should be right in front of this span -> trigger click event*/
        $(self.currentTarget).prev('label').click();
    });
}

function get_language(){
    //default value is english
    var lang ='en';
    if($('.portal-languageselector .currentLanguage.language-es').length > 0){
        lang = 'es';
    }
    return lang;
}

function init_prepopulate(voc){

    fields ={'form.widgets.price_min':voc['min'],'form.widgets.price_max':voc['max']};
    var fieldname;

    for(fieldname in fields){
        $($('input[name="' + fieldname + '"]')).addClass('prepopulate');
        $('input[name="' + fieldname + '"]').attr('rel', fields[fieldname]);
    }

    //prepopulate fields that need default values (using rel attribute)
        $('.prepopulate').each(function(){
            if($(this).val().length<1){
                $(this).val( $(this).attr('rel') );
                $(this).addClass('ghosttext');
            }
            var f1;
            for(f1 in fields){
                if(fields[f1] == $(this).val()){
                   $(this).addClass('ghosttext');
                }
            }
        });

        //clear default value and add '.not-empty' class on click
        $('.prepopulate').focus( function(){
        if( $(this).val() == $(this).attr('rel') ){
            $(this).val('').addClass('not-empty');
            $(this).removeClass('ghosttext');
            }
        });

        //restore default value & remove '.not-empty' class if left blank after click
        $('.prepopulate').blur(function(){
            if( $(this).val() ==='' ){
                $(this).val( $(this).attr('rel') ).removeClass('not-empty');
                $(this).addClass('ghosttext');
            }
        });
        $('#home-search-wrapper form').submit(function(){
            var del_list = ["Min", "Max", "Bajo", "Alto"];
            if(del_list.indexOf($('#form-widgets-price_min').val())> -1 ){
                $('#form-widgets-price_min').val('');
            }
            if(del_list.indexOf($('#form-widgets-price_max').val())> -1 ){
                $('#form-widgets-price_max').val('');
            }

        });
}

function move_col2(){
    if($(window).width()<=980 ){
        $('.section-mls-ecuador-real-estate-casas-y-terrenos #portal-column-one').append($('.section-mls-ecuador-real-estate-casas-y-terrenos #portal-columns'));
        $('.section-mls-ecuador-real-estate-homes-and-land-for-sale #portal-column-one').append($('.section-mls-ecuador-real-estate-casas-y-terrenos #portal-columns'));
    }
}

function responsive_carousel(){
    //set new height for responsive carousel
    $('#viewlet-above-content .carousel').each(function( index ) {
        my_img=$(this).find('.carousel-image img:visible').last();
        height = my_img.height();
      
        if(height>200){
            //images are loaded
            $(this).height(my_img.height());
        }
        else{
            //don't show images until they are loaded
            $('#viewlet-above-content .carousel img').css('visibility', 'hidden');
                        
            $('#viewlet-above-content .carousel').addClass("galleria-loader");
            $(window).load(function() {
                $('#viewlet-above-content .carousel img').css('visibility', 'visible');
                $('#viewlet-above-content .carousel').removeClass("galleria-loader");
                
                responsive_carousel();
            });
        }     
    });
}

function development_button(){
    var tile = $('#portal-column-one dl.portlet .portletHeader a.tile').text();
    $(".portletNavigationTree").append("<div class='dev_button'>"+tile+"</div>");

        $(".dev_button").addClass("active");
        
        $(".dev_button").click(function(){     
            $(".portletNavigationTree .portletItem").toggleClass("active");
            $(".dev_button").toggleClass("active-show");            
        });
}

$(document).ready(function() {
    if($('.portlet_contact').length>0){
        portletform();
        display_portlet_form();
        pos_fix_for_portlet_form();
    }   
    if($('.portletNavigationTree').length>0){
        if($('.portletNavigationTree .hiddenStructure.portletHeader').length>0){
            $(".portletNavigationTree .portletItem").addClass('active');
        }
        else{
            development_button();
        }
    }
    
    if($('#home-search-wrapper').length>0){
        update_search_mask_label();
    }
    /* add custom id for global navigation*/
    $("nav.globalnav").attr('id', 'nav');
    var navigation = responsiveNav("#nav", {
        animate: true,        // Boolean: Use CSS3 transitions, true or false
        transition: 400,      // Integer: Speed of the transition, in milliseconds
        label: "--",        // String: Label for the navigation toggle
        insert: "before",      // String: Insert the toggle before or after the navigation
        customToggle: "",     // Selector: Specify the ID of a custom toggle
        openPos: "relative",  // String: Position of the opened nav, relative or static
        jsClass: "js",        // String: 'JS enabled' class which is added to <html> el
        init: function(){},   // Function: Init callback
        open: function(){},   // Function: Open callback
        close: function(){}   // Function: Close callback
      });

    if($(".global-header").css('position')=='fixed'){
        var header_height = $('header.global-header').css('height');
        $('.global-wrapper .topimage-header').css('margin-top', header_height);
    }
    
    
    //initial resize of the carousel
    if($('#viewlet-above-content .carousel').length>0){
            responsive_carousel();
        }
        
   //developer table
   if($(".developer_table").length>0){
       $(".developer_table tr").first().addClass('nohover');
   }
  
    $(window).resize(function() {
        if($(".global-header").css('position')=='fixed'){
            var header_height = $('header.global-header').css('height');
            $('.global-wrapper .topimage-header').css('margin-top', header_height);
        }
        else{
            $('.global-wrapper .topimage-header').css('margin-top', 0);
        }
        /*
        move_col2();
        */
        if($('#viewlet-above-content .carousel').length>0){
            responsive_carousel();
        }
        
    });
    
});
