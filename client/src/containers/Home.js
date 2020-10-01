import React, {useRef, useEffect} from 'react';
import * as $ from 'jquery';
import 'slick-carousel';
import pic1 from '@public/images/header-slider/pic1.jpg'


const Home = (props) => {

  const pic1 = 'pic1.jpg';
  const pic2 = 'pic2.jpg';
  const pic3 = 'pic3.jpg';
  const mainPic1 = 'pic1.jpg';
  const mainPic2 = 'pic2.jpg';
  const mainPic3 = 'pic3.jpg';
  const mainPic4 = 'pic4.jpg';
  const mainPic5 = 'pic5.jpg';
  const mainPic6 = 'pic6.jpg';
  const mainPic7 = 'pic7.jpg';
  const mainPic8 = 'pic8.jpg';

  const slider = useRef(null);
  const arrBox = useRef(null);
  const dots = useRef(null);

  const initSlider = () => {
    $(slider["current"]).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      fade: true,
      autoplay: true,
      arrows: false,
      asNavFor: dots["current"],
    });

    $(dots["current"]).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: slider["current"],
      focusOnSelect: true
    });

    $('.main__slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      appendArrows: document.getElementsByClassName('main__arrow-box')[0],
      prevArrow: $('.left-arrow'),
      nextArrow: $('.right-arrow'),
      responsive: [
        {
          breakpoint: 1220,
          settings: {
            slidesToShow: 3,
            infinite: true,
            // centerMode:true
          }
        },
        {
          breakpoint: 1040,
          settings: {
            slidesToShow: 2,
            infinite: true,
            centerMode: true
          }
        },
        {
          breakpoint: 940,
          settings: {
            slidesToShow: 2,
            infinite: true,
            centerMode: true
          }
        },
        {
          breakpoint: 900,
          settings: {
            arrows: false,
            slidesToShow: 2,
            infinite: true,
            centerMode: true
          }
        },
        {
          breakpoint: 650,
          settings: {
            arrows: false,
            slidesToShow: 1,
            infinite: true,
            centerMode: true
          }
        },
      ]
    });
  }

  useEffect(() => {
    initSlider();
  }, [slider, dots]);

  return (
    <div>
      <div className="header__main-slider-arrows">
        <div className="header__main-slider" ref={slider}>
          {/*<div className="header__main-slider-bg" style="background-image: url(public/images/logo.png)">*/}
          {/*<div className='header__main-slider-bg' style={{background:`url(${homePictures.pic1})`}} >*/}
          <div className="header__main-slider-bg" style={{background: `url(public/images/header-slider/${pic1})`}}>
            {/*<div className="header__main-slider-bg" style={{background:`url(/public/images/header-slider/pic1.jpg)`}}>*/}
            {/*<img src={`public/images/header-slider/pic1.jpg`} alt="" />*/}
            <div className="header__main-box">
              <div className="border">
                <div className="header__main-subbox">
                  <div className="header__main-subbox-heading">Капкейк</div>
                  <div className="header__main-subbox-name">Lorem ipsum.</div>
                  <div className="header__main-subbox-description">Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Ad aliquam amet animi at aut culpa dolor dolorem earum eos esse eveniet fugit hic illo
                    incidunt, iusto laboriosam libero maiores molestiae nam natus odit perferendis possimus quidem quis
                    quo quod ratione rem saepe tempore totam unde ut veniam veritatis vero voluptatem.
                  </div>
                  <div className="header__main-subbox-button-box">
                    <a href="#">Описание</a>
                    <button>Добавить в корзину</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header__main-slider-bg" style={{background: `url(public/images/header-slider/${pic2})`}}>
            <div className="header__main-box">
              <div className="border">
                <div className="header__main-subbox">
                  <div className="header__main-subbox-heading">Торт</div>
                  <div className="header__main-subbox-name">Lorem ipsum dolor.</div>
                  <div className="header__main-subbox-description">adipisicing elit. Ad aliquam amet animi at aut culpa
                    dolor dolorem earum eos esse eveniet fugit hic illo incidunt, iusto laboriosam libero maiores
                    molestiae nam natus odit perferendis possimus quidem quis quo quod ratione rem saepe tempore totam
                    unde ut veniam veritatis vero voluptatem.
                  </div>
                  <div className="header__main-subbox-button-box">
                    <a href="#">Описание</a>
                    <button>Добавить в корзину</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header__main-slider-bg" style={{background: `url(public/images/header-slider/${pic3})`}}>
            <div className="header__main-box">
              <div className="border">
                <div className="header__main-subbox">
                  <div className="header__main-subbox-heading">Капкейк</div>
                  <div className="header__main-subbox-name">Lorem ipsum dolor sit.</div>
                  <div className="header__main-subbox-description">agit hic illo incidunt, iusto laboriosam libero
                    maiores molestiae nam natus odit perferendis possimus quidem quis quo quod ratione rem saepe tempore
                    totam unde ut veniam veritatis vero voluptatem.
                  </div>
                  <div className="header__main-subbox-button-box">
                    <a href="#">Описание</a>
                    <button>Добавить в корзину</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="arrows-subbox">
          <div className="border">
            <div className='arrows-box' ref={arrBox}>
              <div className='header__main-slider-dots' ref={dots}>
                <div className="slider-dot">
                  <div className="dot"></div>
                </div>
                <div className="slider-dot">
                  <div className="dot"></div>
                </div>
                <div className="slider-dot">
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__promos">
        <div className="header__promos-one"><i className="fas fa-credit-card"></i> Быстрая и безопасная оплата
        </div>
        <div className="header__promos-two"><i className="far fa-star"></i> Качественная продукция</div>
        <div className="header__promos-three"><i className="fab fa-telegram-plane"></i> Быстрая доставка</div>
      </div>

      <section className="main__first-section">
        <h3>Последние новинки</h3>
        <div className="main__content">
          <div className="border">
            <div className="main__arrow-box">


              <div className="main__slider-f">
                <div className="main__slider">
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic1})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit amet, consectetur."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic2})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic3})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic4})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic5})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic6})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic7})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                  <div className="main__slider-item">
                    <div className="main__item">
                      <div className="main__item-pic"
                           style={{background: `url(public/images/main-slider/${mainPic8})`}}>
                        <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                        </div>
                        <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                      </div>
                      <div className="main__item-price">
                        <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                        <div className="main__item-price-price">P 31235,00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="main__second-section">
        <h3>Топ покупаемые</h3>
        <div className="main__second-categories">
          <div className="border">
            <div className="main__second-categories-item"><a href="#">Category 1</a></div>
            <div className="main__second-categories-item"><a href="#">Category 2</a></div>
            <div className="main__second-categories-item"><a href="#">Category 3</a></div>
            <div className="main__second-categories-item"><a href="#">Category 4</a></div>
            <div className="main__second-categories-item"><a href="#">Category 5</a></div>
          </div>
        </div>

        <div className="main__second-tops">
          <div className="border">

            <div className="main__second-tops-box">


              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic8})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit amet."</div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>


              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic1})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>
              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic2})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit amet, consectetur."</div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>
              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic3})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit."
                    </div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>

              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic4})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Maiores, ut."
                    </div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>
              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic5})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit amet."</div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>
              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic6})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>
              <div className="main__second-top-item">
                <div className="main__item">
                  <div className="main__item-pic" style={{background: `url(public/images/main-slider/${mainPic7})`}}>
                    <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span> Добавить в корзину</span>
                    </div>
                    <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                  </div>
                  <div className="main__item-price">
                    <div className="main__item-price-name">Торт "Lorem ipsum dolor sit."</div>
                    <div className="main__item-price-price">P 31235,00</div>
                  </div>
                </div>
              </div>


            </div>


          </div>
        </div>
      </section>
      <div className="main__second-button-more">
        <div className="border">
          <button>загрузить еще</button>
        </div>
      </div>
      <div className="main__second-banner">
        <div className="border">
          <div className="main__second-banner-wrapper"
               style={{background: `url(public/images/main-slider/${mainPic8})`}}>
            <div className="main__second-banner-wrapper-sub">
              <div className="main__second-banner-wrapper-mark">
                <div>Новинка!</div>
              </div>
              <div className="main__second-banner-wrapper-heading">Новая категория</div>
              <div className="main__second-banner-wrapper-name">Lorem ipsum dolor.</div>
              <div className="main__second-banner-wrapper-button">
                <button>Обзор</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home;
