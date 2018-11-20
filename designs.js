$(document).ready(function() {

    function makeGrid() {

        let grid_h = $('#inputHeight').val();
        let grid_w = $('#inputWeight').val();

        // Reset the grid
        $('#pixelCanvas').empty();

        // Build the grid
            for (i = 0; i < grid_h; i++) {
            $('#pixelCanvas').append('<tr>' + i + '</tr>');
            n = 0;
            while (n < grid_w) {
                $('#pixelCanvas tr').last().append('<td></td');
                n++;
            }
        }
    }

    // For the image trace functionality
    function setBackgroundImage() {
        let url = $('#backgroundImageURL').val();
        let cssURL = 'url(' + url + ')';
        console.log(cssURL);
        $('#pixelCanvas').css('background-image', cssURL);
    }

    // Make a default grid so there is something to look at
    makeGrid();

    // Make the grid on each click
    $('#sizePicker').on('click', makeGrid);

    //Make the grid based on a form submit event
    $('#sizePicker').on('submit', function() {
        event.preventDefault();
        makeGrid();
    });

    // Highlight the selected cell
    $('#pixelCanvas').on('mouseenter', 'td', function(){
        $(this).addClass('highlight');
    });
    $('#pixelCanvas').on('mouseleave', 'td', function(){
        $(this).removeClass('highlight');
    });

    // Set default color and get color picker results
    let gridColor = '#808080';
    $('#colorPicker').on('change', function() {
        gridColor = $(this).val();
        console.log('Color selected is: ' + gridColor);
    });

    /*
    // When the cell is clicked, make the cell that color
    // Using mousedown instead of click event so that dragging
    // doesn't skip the first cell
    $('#pixelCanvas').on('mousedown', 'td', function(){
        if ($(this).css('background-color') !== 'rgba(0, 0, 0, 0)') {
            $(this).css('background-color', ''); 
        } else {
            $(this).css('background-color', gridColor);
            console.log('Making cell: ' + gridColor);
        }
    });
    */
    
    //Single click to paint a cell
    $('#pixelCanvas').on('mousedown', 'td', function(){
        $(this).css('background-color', gridColor); 
    });
    
    
    // Double click to delete
    $('#pixelCanvas').on('dblclick', 'td', function(){
        $(this).css('background-color', ''); 
    });

    // Set up cell color on drag
    let mouseDown = false;
    $('body').on('mousedown', function(){
        mouseDown = true;
    });
    $('body').on('mouseup', function() {
        mouseDown = false;
    });

    $('#pixelCanvas').on('mouseenter', 'td', function(){
        if (mouseDown) {
            $(this).css('background-color', gridColor);
            console.log('Making cell: ' + gridColor);
        }
    });

    //Set the background image from URL entry
    $('#imageURL').on('submit', function() {
        event.preventDefault();
        setBackgroundImage();
    });

    //Toggle the image on/off
    $('#toggleImage').on('click', function() {
        if( $('#pixelCanvas').css('background-image') != 'none') {
            $('#pixelCanvas').css('background-image', 'none');
        } else {
            setBackgroundImage();
        }
    });

    //Toggle the grid on/off
    $('#toggleGrid').on('click', function() {
        if ( $('#pixelCanvas,tr,td').css('border-style') == 'solid' ) {
            $('#pixelCanvas,tr,td').css('border-style', 'unset')
        } else {
            $('#pixelCanvas,tr,td').css('border-style', 'solid')
        }
    });

    //Clear all drawn pixels from grid
    $('#clearPixels').on('click', function() {
        event.preventDefault();
        makeGrid();
    });
    
    //Save art
    $('#saveArt').on('click', function(){
        html2canvas(pixelCanvas, {
            onrendered: function(canvas) {
                const a = document.createElement('a');
                a.href = canvas.toDataURL();
                a.download = 'pixelart.png';
                a.click();
            }
        });
    });

}); // End document ready function