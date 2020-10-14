import React, {useEffect, useMemo, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {withRouter} from "react-router";
import {connect, useDispatch, useSelector} from "react-redux";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {setMinPrice, setMaxPrice, openNextCakeSegment, setCurrentMaxPrice, setCurrentMinPrice} from "../actions/cakesActions";

function readFileAsync(file) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    }
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function radioHandler(e, image) {
  image.style.backgroundImage = this.nextElementSibling.style.background;
}

const Cakes = (props) => {
  const arrayOfCakes = [
    {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic1.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic2.jpg'},
    // {name: 'Ночная пьянка', price: 31525, image: 'pic3.jpg'},
  ];

  useEffect(() => {
    // props.getCakesContent(props.currentCakeSegment, props.maxPrice, props.minPrice, props.fillings, props.colors);








    // if (typeof (document.getElementsByClassName('category__main-main-control-slider')[0]) != "undefined") {
    //
    //   var slider = document.getElementsByClassName('category__main-main-control-slider')[0];
    //
    //   noUiSlider.create(slider, {
    //     start: [props.minPrice, props.maxPrice],
    //     connect: true,
    //     step: 100,
    //     margin: 0,
    //     range: {
    //       'min': props.minPrice,
    //       'max': props.maxPrice
    //     },
    //   });
    //
    //   slider.noUiSlider.on('update', function (values, handle) {
    //     if (handle) {
    //       props.setMaxPrice(values[handle]);
    //     } else {
    //       props.setMinPrice(values[handle]);
    //     }
    //   });
    // }


  }, []);

  return (
    <div className="">
      {useParams().category}

      <section className="category__main">

        <div className="category__main-main">
          <div className="border">
            <div className="category__main-main-control">
              <div className="category__main-main-control-filling">
                <h3>Начинка</h3>
                <ul>
                  {['Начинка1', 'Начинка2', 'Начинка3', 'Начинка4'].map((item, index) => {
                    return <li key={index} onClick={((e) => {
                      e.preventDefault();
                      e.target.parentNode.classList.contains('active')
                        ? e.target.parentNode.classList.remove('active')
                        : e.target.parentNode.classList.add('active')
                    })}>

                      <a href="#">
                        <div></div>
                        {item} <span>(23)</span></a></li>
                  })}
                </ul>
              </div>
              <div className="category__main-main-control-price">
                <h3>Стоимость</h3>
                <div className="category__main-main-control-slider">
                  <Nouislider
                    range={{min: props.minPrice, max: props.maxPrice}}
                    start={[props.minPrice, props.maxPrice]}
                    step={100}
                    margin={0}
                    accessibility
                    connect
                    onSlide={(render, handle, value, un, percent) => {
                      if (handle) {
                        props.setCurrentMaxPrice(Math.round(value[handle]));
                      } else {
                        props.setCurrentMinPrice(Math.round(value[handle]));
                      }
                    }}
                  />
                </div>
                <div className="category__main-main-control-numbers">
                  <span className="category__main-main-control-number">{props.currentMinPrice}</span>
                  <span className="category__main-main-control-number">{props.currentMaxPrice}</span>
                </div>
              </div>

              <div className="category__main-main-control-color">
                <h3>Цвета</h3>
                <div className="category__main-main-control-colors">

                  {['green', 'yellow', 'plum', 'red'].map((colour, index) => {
                    return (
                      <label className="label" key={index}>
                        <input type="checkbox" className="custom-checkbox"/>
                        <span className="fake" style={{backgroundColor: colour}}></span>
                        <span className="text">(45)</span>
                      </label>
                    )
                  })}
                </div>
              </div>
              <hr/>

            </div>
            <div className="category__main-main-pics">
              <div className="category__main-main-items">
                {arrayOfCakes.map((cake, index) => {
                  return (
                    <div className="main__second-top-item" key={index}>
                      <div className="main__item">
                        <div className="main__item-pic"
                             style={{background: `url(/public/images/main-slider/${cake.image})`}}>
                          <div className="main__item-pic-cart"><i className="fas fa-shopping-cart"></i><span>   Добавить в корзину</span>
                          </div>
                          <div className="main__item-pic-desc"><i className="fas fa-info-circle"></i></div>
                        </div>
                        <div className="main__item-price">
                          <div className="main__item-price-name">Торт "{cake.name}"</div>
                          <div className="main__item-price-price">P {cake.price}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
              {
                props.currentCakeSegment !== props.numberOfSegments - 1
                  ? <div className="main__second-button-more">
                    <div className="border">
                      <button>загрузить еще</button>
                    </div>
                  </div>
                  : null
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    firstLoad: state.cakesReducer.firstLoad,
    maxPrice: state.cakesReducer.maxPrice,
    minPrice: state.cakesReducer.minPrice,
    currentMaxPrice: state.cakesReducer.currentMaxPrice,
    currentMinPrice: state.cakesReducer.currentMinPrice,
    currentCakeSegment: state.cakesReducer.currentCakeSegment,
    numberOfSegments: state.cakesReducer.numberOfSegments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMaxPrice: (maxPrice) => dispatch(setMaxPrice(maxPrice)),
    setMinPrice: (minPrice) => dispatch(setMinPrice(minPrice)),
    setCurrentMaxPrice: (maxPrice) => dispatch(setCurrentMaxPrice(maxPrice)),
    setCurrentMinPrice: (minPrice) => dispatch(setCurrentMinPrice(minPrice)),
    openNextCakeSegment: (minPrice) => dispatch(openNextCakeSegment(minPrice)),
  }
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cakes));

