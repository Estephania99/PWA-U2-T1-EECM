let url = window.location.href;
let swDirectory = "/PWA-U2-T1-EECM/sw.js"

if(navigator.serviceWorker){
    if(url.includes('localhost')){
        navigator.serviceWorker.register('/sw.js');
    }else{
        navigator.serviceWorker.register(swDirectory);
    }
}

let principal = $('#principal');
let notice = $('#notice');

$('.btn-seguir').on('click', function(e){
    e.preventDefault();
    console.log("Seguir leyendo");
    principal.fadeOut(function(){
        notice.slideDown(1000)
    })
    /*notice.fadeIn('slow', function(){
        principal.slideUp(1000)
    });*/
});

$('.btn-regresar').on('click', function(){
    notice.fadeOut(function(){
        principal.slideDown(1000);
    })
})
