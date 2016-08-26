

// SIGNATURE PROGRESS
function moveProgressBar() {
    var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
    var getProgressWrapWidth = $('.progress-wrap').width();
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 2500;
    
    // on page load, animate percentage bar to data percentage length
    // .stop() used to prevent animation queueing
    $('.progress-bar').stop().animate({
        width: progressTotal
    }, animationLength);
}

function moveAsideBar(){
    $(".hamburger").click(function(){
        $(".main_page_personal_list").slideToggle("fast", function(){

        })
    })
}

function openCreateModal(){
    
    // Get the modal
    var $modal = $('#myModal');

    // Get the button that opens the modal

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    $("#myBtn").click(function() {
        $modal.css("display", "block")
    });

    // When the user clicks on <span> (x), close the modal
    $(".modal_close").click(function() {
        $modal.css("display", "none")
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == $modal) {
            $modal.css("display", "none")
        }
    }
}


function changeCondIcon(){
    $(".change_cond_icon").click(function() { 
      var _this = $(this);
      var current = _this.attr("src");
      var swap = _this.attr("data-swap");     
     _this.attr('src', swap).attr("data-swap",current);   
});  
}