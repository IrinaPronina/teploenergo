import Swiper, {
  Navigation,
  Pagination,
} from 'swiper';

import Choices from 'choices.js';
import {
  Fancybox
} from "@fancyapps/ui";
import getScrollSize from 'Utils/getScrollSize.js';


Swiper.use([Navigation, Pagination]);

'use strict';

window.addEventListener("load", () => {

  const tablet = window.matchMedia('(max-width:992px)');
  const mobile = window.matchMedia('(max-width:767.98px)');



  /*--VIDEO--*/


  // selector of all videos on the page
  const videos = document.querySelectorAll('.video');

  // generate video url
  let generateUrl = function (id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  };

  // creating iframe
  let createIframe = function (id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('src', generateUrl(id));

    return iframe;
  };

  // main code
  videos.forEach((el) => {
    let videoHref = el.getAttribute('data-video');

    let deletedLength = 'https://youtu.be/'.length;

    let videoId = videoHref.substring(deletedLength, videoHref.length);

    let img = el.querySelector('.video-poster');
    let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
    img.setAttribute('src', youtubeImgSrc);

    el.addEventListener('click', (e) => {
      e.preventDefault();

      let iframe = createIframe(videoId);
      el.querySelector('img').remove();
      el.appendChild(iframe);
      el.querySelector('button').remove();
    });
  });


  /*--VIDEO-FANCYBOX--*/

  const fVideos = document.querySelectorAll('._video-f-link');

  if (fVideos) {
    fVideos.forEach((el) => {
      let videoHref = el.href;

      let deletedLength = 'https://youtu.be/'.length;
      let videoId = videoHref.substring(deletedLength, videoHref.length);
      console.log(videoId);
      let img = el.querySelector('._video-f-poster');
      let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
      img.setAttribute('src', youtubeImgSrc);
    });
  }


  /*--SAME HEIGHT--*/

  const same = document.querySelector("._same-height");

  if (same) {

    const staffItem = same.querySelector('._sh-staff');

    if (staffItem) {

      if (!tablet.matches) {
        function sameHeight() {
          const boxes = document.querySelectorAll('._sh-staff');
          let tmp = 0;
          for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].offsetHeight > tmp) {
              tmp = boxes[i].offsetHeight;
            }
          }
          for (var z = 0; z < boxes.length; z++) {
            boxes[z].style.height = tmp + "px";
          }
        }

        sameHeight()

        window.addEventListener('resize', sameHeight);
      }

    } else {
      function sameHeight() {
        const boxes = document.querySelectorAll('._sh-item');
        let tmp = 0;
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].offsetHeight > tmp) {
            tmp = boxes[i].offsetHeight;
          }
        }
        for (var z = 0; z < boxes.length; z++) {
          boxes[z].style.height = tmp + "px";
        }
      }

      sameHeight()

      window.addEventListener('resize', sameHeight);
    }


  }


  /*--SWIPER--*/

  const hrBlanks = document.querySelector(".hr-doc__slider.swiper");

  if (hrBlanks) {
    let hrSwiper;
    let init = false;

    function swiperMobile() {
      if (tablet.matches) {
        if (!init) {
          init = true;

          hrSwiper = new Swiper(".hr-doc__slider.swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            // centeredSlides: true,
            speed: 1000,
            pagination: {
              el: '.swiper-pagination',
            },
            breakpoints: {
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
                slidesPerColumn: 1,
                // centeredSlides: false,
              },
            }
          });
        }
      } else if (hrSwiper) {
        hrSwiper.destroy();
        init = false;
      }


    }

    swiperMobile();

    window.addEventListener('resize', swiperMobile);
  }

  const hrHelp = document.querySelector(".hr-help__slider.swiper");

  if (hrHelp) {
    let hrHelpSwiper;
    let init = false;

    function swiperMobile() {

      if (tablet.matches) {
        if (!init) {
          init = true;

          hrHelpSwiper = new Swiper(".hr-help__slider.swiper", {
            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 30,
            // centeredSlides: true,
            loop: true,
            speed: 1000,
            pagination: {
              el: '.swiper-pagination',
            },
            breakpoints: {
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
                // centeredSlides: false,
              },
            }
          });
        }
      } else if (hrHelpSwiper) {
        hrHelpSwiper.destroy();
        init = false;
      }
    }

    swiperMobile();

    window.addEventListener('resize', swiperMobile);
  }





  /*--COMMENTS ACCORDEON--*/

  const comments = document.querySelector(".comments");

  if (comments) {

    const commentsBtns = document.querySelectorAll('.comments__reply')


    for (let i = 0; i < commentsBtns.length; i++) {
      let commentsBtn = commentsBtns[i];

      commentsBtn.addEventListener("click", function (e) {
        e.target.parentElement.classList.toggle('comments-open');
      });
    }
  }




  /*--MORE ACCORDEON--*/

  const staffHelp = document.querySelector(".staff-help");

  if (staffHelp) {


    const moreBtns = document.querySelectorAll('.staff-help__body')

    for (let i = 0; i < moreBtns.length; i++) {
      let moreBtn = moreBtns[i];

      moreBtn.addEventListener("click", function (e) {

        moreBtn.parentElement.classList.toggle('more-open');

        console.log(moreBtn.parentElement);
      });
    }
  }

  /*--SELECTS--*/

  const selects = document.querySelectorAll('.choices-js');

  if (selects.length > 0) {
    selects.forEach(function (item) {
      new Choices(item, {
        allowHTML: true,
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: ' ',
      });
    });
  }

  /*--TABS-*/

  const tabs = document.querySelector(".pa__tabs");

  if (tabs) {
    const filterTabs = document.querySelector(".pa__orders");

    filterTabs.firstElementChild.classList.add("active");
    tabs.firstElementChild.classList.add("pa__tab--active");


    const tabButton = document.querySelectorAll(".pa__tab");
    const contents = document.querySelectorAll(".pa__orders-list");


    tabs.addEventListener("click", function (e) {

      let id = e.target.getAttribute('data-id');

      if (id) {
        tabButton.forEach(btn => {
          btn.classList.remove("pa__tab--active");
        });
        e.target.classList.add("pa__tab--active");

        contents.forEach(content => {
          content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
      }
    });
  }



  /*--INPUT FILE--*/

  const inputs = document.querySelectorAll("input");

  if (inputs) {
    inputs.forEach(function (input) {
      input.addEventListener('change', function (e) {

        if (this.type == 'file') {

          const exe = document.querySelector("._file-load");
          exe.innerHTML = this.value;
          console.dir(exe);
        }
      })
    })
  }

  /*--MENU--*/

  const doc = document;
  const body = doc.querySelector('body');

  if (screen.width > 1023) {
    const header = doc.querySelector('.page-header'),
      headerHeight = header.offsetHeight,
      bigMenu = doc.querySelector('.big-menu');

    bigMenu.style.transform = `translateY(${headerHeight - 1}px)`;
    bigMenu.style.height = `calc(100vh - ${headerHeight}px)`;
  } else {
    const bigMenu = doc.querySelector('.big-menu');

    bigMenu.style.height = `100vh`;
  }

  body.addEventListener('click', (e) => {
    if (e.target.closest('.menu-trigger')) {
      if (body.classList.contains('menu-active')) {
        body.classList.remove('menu-active');
        setTimeout(() => {
          body.classList.remove('of-h');
          body.style.paddingRight = '0';
          body.style.backgroundColor = '#F0F5F9';
        }, 300);
      } else {
        body.classList.add('menu-active', 'of-h');
        body.style.paddingRight = getScrollSize() + 'px';
        body.style.backgroundColor = '#fff';
      }
    }
  });


  /*--PA ACCORDEON--*/

  const paBtn = document.querySelector(".page-header__pa");


  if (paBtn) {

    paBtn.addEventListener("click", function (e) {

      paBtn.classList.toggle('open');
    });
  }

  /*--SEARCH--*/

  const searchBlock = document.querySelector(".page-header__search");


  if (searchBlock) {

    searchBlock.addEventListener("click", function (e) {
      searchBlock.classList.toggle('open');
      searchBlock.closest('.page-header').classList.toggle('open');
    });
  }

});
