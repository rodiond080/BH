
$(function(){
    $('.header__main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:true,
        fade:true,
        appendArrows:$('.arrows-box'),
        prevArrow: '<div class="arrows left-arrow"><i class="fas fa-chevron-circle-left"></i></div>',
        nextArrow: '<div class="arrows right-arrow"><i class="fas fa-chevron-circle-right"></i></div>',
        asNavFor: '.header__main-slider-dots'
    });

    $('.header__main-slider-dots').slick({
        slidesToShow:3,
        slidesToScroll:1,
        asNavFor: '.header__main-slider',
        focusOnSelect: true
    });

    $('.main__slider').slick({
        slidesToShow:4,
        slidesToScroll:1,
        infinite: true,
        appendArrows: $('.main__arrow-box'),
        prevArrow: '<div class="arrows left-arrow"><i class="fas fa-chevron-circle-left"></i></div>',
        nextArrow: '<div class="arrows right-arrow"><i class="fas fa-chevron-circle-right"></i></div>',
        responsive:[
            {
                breakpoint:1220,
                settings:{
                    slidesToShow:3,
                    infinite:true,
                    // centerMode:true
                }
            },
            {
                breakpoint:1040,
                settings:{
                    slidesToShow:2,
                    infinite:true,
                    centerMode:true
                }
            },
            {
                breakpoint:940,
                settings:{
                    slidesToShow:2,
                    infinite:true,
                    centerMode:true
                }
            },
            {
                breakpoint:900,
                settings:{
                    arrows:false,
                    slidesToShow:2,
                    infinite:true,
                    centerMode:true
                }
            },
            {
                breakpoint:650,
                settings:{
                    arrows:false,
                    slidesToShow:1,
                    infinite:true,
                    centerMode:true
                }
            },
            ]
    });

    $('#btn-menu').click(function (e) {
        e.preventDefault();
        if(document.getElementsByClassName('header__nav')[0].classList.value==='header__nav active'){
            document.getElementsByClassName('header__nav')[0].classList.value='header__nav';
        }else {
            document.getElementsByClassName('header__nav')[0].classList.add('active');
            document.getElementsByClassName('menu__list')[0].classList.add('animate__animated animate__bounce');
        }
    });

    new WOW().init();

    if($(window).width()<=900){
        $('.header__nav-cakes').html($('.header__nav-cakes').html()+'&nbsp<i class="fas fa-caret-down"></i>\n' +
            '\n')

        $('.header__nav-capcakes').html($('.header__nav-capcakes').html()+'&nbsp<i class="fas fa-caret-down"></i>\n' +
            '\n')
    }

    $('.header__nav-cakes').mouseover(function () {
        if($(window).width()>900) {
            $('.header__nav-cakes-cat').addClass("animate__animated animate__slideInUp");
        }else {
             //
        }
    });

    $('.header__nav-capcakes').mouseover(function () {
        if($(window).width()>900) {
            $('.header__nav-capcakes-cat').addClass("animate__animated animate__slideInUp");
        }else {
            //
        }
    });

    $('.header__nav-cakes').click(function (e) {
        e.preventDefault();
        if($('.header__nav-cakes-cat')[0].classList.value=='header__nav-cakes-cat') {
            $('.header__nav-cakes-cat')[0].classList.add("active");
        }else {
            $('.header__nav-cakes-cat')[0].classList.remove("active");
        }
    })

    $('.header__nav-capcakes').click(function (e) {
        e.preventDefault();
        if($('.header__nav-capcakes-cat')[0].classList.value=='header__nav-capcakes-cat') {
            $('.header__nav-capcakes-cat')[0].classList.add("active");
        }else {
            $('.header__nav-capcakes-cat')[0].classList.remove("active");
        }
    })

    $('#btn-menu').click(function (e) {
        e.preventDefault();
    });

    backToTop();

    function backToTop() {
        var btn = $('.main__up-button');
        $(window).on('scroll', function(){
            if($(this).scrollTop()>=50){
                btn.fadeIn();
            }else {
                btn.fadeOut();
            }
        });

        btn.on('click', function (e) {
            e.preventDefault();
            $('html').animate({scrollTop: 0}, 1000);
        })
    }

    if(typeof (document.getElementsByClassName('category__main-main-control-slider')[0])!="undefined") {
        var slider = document.getElementsByClassName('category__main-main-control-slider')[0];


        var min = document.getElementsByClassName('category__main-main-control-number')[0];
        var max = document.getElementsByClassName('category__main-main-control-number')[1];

        // console.log(document.getElementsByClassName('product__main-main-control-numbers')[2])

        noUiSlider.create(slider, {
            start: [0, 10000],
            connect: true,
            step: 100,
            margin: 0,
            range: {
                'min': 0,
                'max': 10000
            },
        });


        slider.noUiSlider.on('update', function (values, handle) {
            if (handle) {
                max.innerHTML = values[handle];
            } else {
                min.innerHTML = values[handle];
            }
        });
    }

  if(typeof (document.getElementsByClassName('product__main-gallery-img')[0])!="undefined") {

    var productImg = document.getElementsByClassName('product__main-gallery-img')[0]
    var overAllX = productImg.offsetWidth
    var overAllY = productImg.offsetHeight
    productImg.addEventListener('mousemove', function (event) {
      var onePercentX = overAllX / 100
      var onePercentY = overAllY / 100
      var newXPercents = Math.ceil(event.offsetX / onePercentX)
      var newYPercents = Math.ceil(event.offsetY / onePercentY)
      productImg.style.backgroundPosition = newXPercents + '% ' + newYPercents + '%'

    })

    var imageRadio = document.getElementsByName('picture')
    var image = document.getElementsByClassName('product__main-gallery-img')[0]

    for (var i = 0; i < imageRadio.length; i++) {
      imageRadio[i].onclick = radioHandler;
    }

    function radioHandler(e) {
      console.log(this.nextElementSibling.style.background)
      image.style.backgroundImage = this.nextElementSibling.style.background
    }
  }

  if(document.getElementById('product__main-data-quantity-counter-minus')!=null) {
    var btnMinus = document.getElementById('product__main-data-quantity-counter-minus')
    var counterInput = document.getElementById('product__main-data-quantity-counter-input')
    var btnPlus = document.getElementById('product__main-data-quantity-counter-plus')

    btnMinus.addEventListener('click', function (e) {
      counterInput.value = Number.parseInt(counterInput.value) - 1
    })

    btnPlus.addEventListener('click', function (e) {
      counterInput.value = Number.parseInt(counterInput.value) + 1
    })
  }



  for(var i = 0; i< document.getElementsByClassName('cart__main-card-quantity-counter').length; i++){

    document.getElementsByClassName('cart__main-card-quantity-counter-minus')[i]
      .addEventListener('click', function (e) {
      this.nextElementSibling.value =  this.nextElementSibling.value-1
    })

    document.getElementsByClassName('cart__main-card-quantity-counter-plus')[i]
      .addEventListener('click', function (e) {
      this.previousElementSibling.value =  Number.parseInt(this.previousElementSibling.value)+1
    })
  }





});
