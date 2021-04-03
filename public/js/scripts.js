$(document).foundation()

$(function(){

    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    console.log("is Chrome ? ", isChrome);

    let scenes = [];
    let y = 0;

    // initial smooth-scrollbar
    let scroll = Scrollbar.init(
        document.querySelector("#container-scroll")
    );


    // initiate ScrollMagic Controller
    let controller =
        new ScrollMagic.Controller(
            {
                refreshInterval: 0,
            }
        );

    // update scrollY controller
    if(isChrome){
        controller.scrollPos(function () {
            return y;
        });
    }

    // initiate ScrollMagic Scene each section
    $("section.container .section").each(function(){

        let text = $(this).find(".text");
        let chiffre = $(this).find(".chiffre");
        let image = $(this).find(".image");

        let tl = new TimelineMax();
        tl.to(text, 1, { yPercent: -80, rotation: 0.01 }, "start")
        tl.to(chiffre, 1, { yPercent: 60, rotation: 0.01 }, "start")
        tl.to(image, 1, { autoAlpha: 1, yPercent: 20, rotation: 0.01 }, "start")

        scenes.push(
            new ScrollMagic
                .Scene(
                    { offset: 200 , triggerHook: "onEnter", triggerElement: $(this)[0], duration: $(window).height(), reverse:true })
                .setTween(tl)
                .on("leave", function(){
                    //console.log('leave scene');
                })
                .on("enter", function(){
                    //console.log('enter scene');
                })
                .on("progress", function(e){
                    //console.log("progress => ", e.progress);
                })
                .addTo(controller)
        );
    });

    // listener smooth-scrollbar, update controller
    scroll.addListener(function(status) {

        y = status.offset.y;

        if(isChrome){
            controller.update();
        } else {
            scenes.forEach(function(scene){
                scene.refresh();
            });
        }

    });


});