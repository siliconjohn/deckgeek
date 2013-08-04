jQuery.fn.makeSelectable = function( options )
{    
    var $t = $(this);
    options || ( options = {} );
    var doSelEvent = true;
    var doDeSelEvent = true; 
    if ( options.doSelectEvent == false ) doSelEvent = false;
    if ( options.doDeSelectEvent == false ) doDeSelEvent = false; 
  
    // add click event 
    $t.click( function( e ) 
    {
         $(this).toggleSelected( options );     
    });

    // add select event
    if(doSelEvent == true)
    {
        $t.on( 'becameSelected', function( event ) 
        {
    
        });  
    }
    
    // add deselect event
    if(doDeSelEvent == true)
    {
        $t.on( 'becameDeSelected', function( event ) 
        {
        
        }); 
    }
        
    jQuery.fn.selectElement = function() 
    {     
        var $t = $(this);
        $t.addClass( 'jselected' ); 
        $t.trigger( 'becameSelected' );
    }
    
    jQuery.fn.deSelectElements = function () 
    {    
        var $t = $(this);
        
        $t.each( function( index ) 
        {
            if( $(this).hasClass( 'jselected' ))
            {
                $(this).removeClass( 'jselected' );
                $(this).trigger( 'becameDeSelected' );
            }
        });
    }
   
    jQuery.fn.toggleSelected = function ( options )
    {   
        var $t = $(this);
        var multiple = options.multiple ? options.multiple : false;
        var selected = $t.hasClass( 'jselected' );
        var canDeSelect = options.canDeSelect ? options.canDeSelect : false; 
    
        if( selected == false )
        {
           if ( multiple == false ) $t.siblings().deSelectElements();
            $t.selectElement( $t );
        }
        else
        { 
            if ( multiple == true || canDeSelect == true )
                $t.deSelectElements();
        }
    } 
}  

 
 
 