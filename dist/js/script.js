$(function(){
    
  console.log(' We still running');
  $(window).bind("resize",function(){
    console.log($(this).width())
    if($(this).width() > 500){
    $('#2container').removeClass('container-fluid')
    }
    else{
    $('#2container').addClass('container-fluid')
    }
})
});