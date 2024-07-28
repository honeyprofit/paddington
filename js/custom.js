$(function(){

/* 네비 메뉴 */
  $('ul.gnb').hover(function(){
    $('.nav_bg').stop().fadeIn();
    $('ul.gnb>li>ul.sub').stop().slideDown();
  },function(){
    $('.nav_bg').stop().fadeOut();
    $('ul.gnb>li>ul.sub').stop().slideUp();
  });

/* 햄버거 */
    $('header .ham_all ul').click(function(){
    $(this).removeClass('on').siblings().addClass('on');
    $('.ham_nav').fadeToggle();
  });


/* header 색상 */
  let scTop = 0;
  let introTop = $('section.intro').offset().top;

  $(window).scroll(function(){
      scTop = $(this).scrollTop();
      // console.log(scTop, introTop);
      
      if(scTop>=introTop-100){
          $('header').addClass('scroll');
      }else{
          $('header').removeClass('scroll');
      }
    })


/* 메인슬라이드 */
  let swiper1 = new Swiper(".main_banner", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".main_banner .swiper-pagination",
          clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });


/* section.char 캐릭터 나타나기 */
  if (window.innerWidth >= 1024) {
      function onScroll() {
        for(let i = 1; i <= 6; i++) {
            let item = $(`.char${i}`);
            let rect = item.get(0).getBoundingClientRect();
            //get(0): article 선택자만 선택
            //getBoundingClientRect() 위치크기정보
            
            if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
                item.addClass('view'); 
            } else {
                item.removeClass('view'); 
            }
        }
    }
    window.addEventListener('scroll', onScroll); //스크롤이벤트 리스너
    onScroll(); //호출
  }


/* section.movie slide*/
    let slideI = 0;
    const slideLength = $('.movie_slide ul.slide li').length - 1;
      $('.movie_slide ul.slide li').eq(slideI).siblings().hide();
      let inter = setInterval(goSlide,3000);

      function goSlide(){
        if(slideI<slideLength){
          slideI++;
        }else{
          slideI=0;
        }
        rollingSlide();      
      };
      function backSlide(){
        if(slideI==0){
          slideI=slideLength;
        }else{
          slideI--;
        }
        rollingSlide();  
      }

    function rollingSlide(){
        $('.movie_slide ul.slide li').eq(slideI).fadeIn().siblings().fadeOut();
        $('ul.pager li').removeClass('active').eq(slideI).addClass('active');
      }

      $('.movie_slide .right_btn').click(function(){
        clearInterval(inter);
        goSlide();
        inter = setInterval(goSlide,6000);
      });

      $('.movie_slide .left_btn').click(function(){
        clearInterval(inter);
        backSlide();
        inter = setInterval(goSlide,3000);
      });

      $('ul.pager li').click(function(){
        clearInterval(inter);
        slideI = $(this).index();
        rollingSlide();
        inter = setInterval(goSlide,3000);
      });


/* video modal */
// let movieI;
$('.movie_slide .play_btn').click(function(){
    let movieI = slideI+1;
    console.log(movieI);
    $(`.modal${movieI}`).fadeIn();
});
$('.vid_modal i').click(function(){    
    $(`.vid_modal`).fadeOut();
});

/* fade-in */
if (window.innerWidth >= 1024){
  function fadeScroll(){
    $('.fade-in').each(function() {
      let thisSelector = $(this).get(0);
      console.log(thisSelector);
      let thisRect = thisSelector.getBoundingClientRect();

      if (thisRect.top < window.innerHeight && thisRect.bottom > 0) {
        if (!$(this).hasClass('visible')) {
          $(this).addClass('visible');
        }
      }
    });
  }
}



}); //ready-지우면안됨