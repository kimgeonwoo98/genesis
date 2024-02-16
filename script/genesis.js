(function($, window,document){
    const genesis={
        init(){
            this.section1();
            this.section2();
        },
        section1(){
            let cnt=0;
            let setId;
            let mouseDown = false;
            let tuochStart = null;
            let touchEnd = null;
            let winW = $(window).width();
            let dragStart = null;
            let dragEnd = null;
            function mainSlide(){
                $('.slide-wrap').stop().animate({left: `${cnt*-100}%`},600,function(){
                    if(cnt>10) cnt=0;
                    if(cnt<0) cnt=10;
                    $('.slide-wrap').stop().animate({left: `${cnt*-100}%`},0);
                });
                $('.page-btn').removeClass('on')
                $('.page-btn').eq(cnt>10?cnt=0:cnt).addClass('on')
                
            };
            function nextCunt(){
                cnt+=1
                mainSlide();
            };
            function prevCunt(){
                cnt-=1
                mainSlide();
            };
            function autoTimer(){
                setId = setInterval(nextCunt,6000);
            };
            autoTimer();
            $('.page-btn').each(function(idx){
                $(this).on({
                    click(){
                        clearInterval(setId);
                        cnt=idx;
                        autoTimer();
                        mainSlide();
                    }
                })
            });
            $('.play-stop-btn').on({
                click(){
                    if($(this).hasClass('play')){
                        $(this).addClass('stop');
                        $(this).removeClass('play');
                        clearInterval(setId);
                    }
                    else{
                        $(this).addClass('play');
                        $(this).removeClass('stop');
                        autoTimer();
                    }
                }, 
            });

            $('.contnen').on({
                mousedown(e){
                    winW = $(window).width();
                    $('.slide-container').css({cursor:'grabbing'});
                    mouseDown = true;
                    clearInterval(setId)
                    tuochStart = e.clientX;
                    dragStart = e.clientX-($('.slide-wrap').offset().left+winW);
                },

                mousemove(e){
                    if(!mouseDown) return;
                    dragEnd = e.clientX;
                    $('.slide-wrap').css({left:`${dragEnd-dragStart}px`});
                },

                mouseup(e){
                    $('.slide-container').css({cursor:'grab'});
                    mouseDown = false;
                    touchEnd = e.clientX;
                    if(tuochStart-touchEnd>500){
                        nextCunt();
                    }
                    if(tuochStart-touchEnd<-500){
                        prevCunt();
                    }
                    if(tuochStart-touchEnd >= -500 && tuochStart-touchEnd <= 500){
                        mainSlide();
                    }
                    autoTimer();
                }
            });

            $(document).on({
                mouseup(e){
                    if(!mouseDown) return;
                    $('.slide-container').css({cursor:'grab'});
                    mouseDown = false;
                    touchEnd = e.clientX;
                    if(tuochStart-touchEnd>500){
                        nextCunt();
                    }
                    if(tuochStart-touchEnd<-500){
                        prevCunt();
                    }
                    if(tuochStart-touchEnd >= -500 && tuochStart-touchEnd <= 500){
                        mainSlide();
                    }
                    autoTimer();
                }
        
            })

        },


        section2(){}
    };
    genesis.init();
})(jQuery,window,document);