import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {getAboutContent} from "../actions/aboutActions";
import {connect} from "react-redux";
import {toggleBackdropActive} from "../actions/aboutActions";

function mapStateToProps(state) {
  return {
    aboutContent: state.aboutReducer.aboutContent,
    imageSizes: state.aboutReducer.imageSizes,
    backdropActive: state.menuReducer.backdropActive
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAboutContent: () => dispatch(getAboutContent()),
    toggleBackdropActive: (backdropActive) => dispatch(toggleBackdropActive(backdropActive))
  }
}



function getLargeWidthOfImage(currentWidth, originalWidth) {
  const screenWidth = window.innerWidth;
  let resultWidth = currentWidth;
  while (resultWidth < originalWidth && resultWidth < screenWidth) {
    resultWidth += 20;
  }
  return resultWidth - resultWidth/3;
}



function getLargeHeightOfImage(largeWidth, originalWidth, originalHeight) {
  return largeWidth * originalHeight / originalWidth;
}


function getLargeHeightOfImageVertical(currentHeight, originalHeight) {
  const screenHeight = window.innerHeight;
  let resultHeight = currentHeight;
  while (resultHeight < originalHeight && resultHeight < screenHeight) {
    resultHeight += 20;
  }
  return resultHeight;
}

function getLargeWidthOfImageVertical(largeHeight, originalHeight, originalWidth) {
  return largeHeight * originalWidth / originalHeight;
}



const About = (props) => {

  useEffect(() => {
    props.getAboutContent();

    let counter = 0;
    Array.from(document.getElementsByClassName('about__image-link')).forEach(a => {
      const originalWidth = props.imageSizes[counter].width;
      const originalHeight = props.imageSizes[counter].height;

      a.addEventListener('click', e => {
        e.preventDefault();
        const backdrop = document.getElementById('backdrop');
        a.parentElement.classList.add('active');

        const spareLink = a.cloneNode(true);
        spareLink.children[0].classList.add('active');

        const sketchWidth = parseInt(spareLink.children[0].style.width, 10);
        const sketchHeight = parseInt(spareLink.children[0].style.height, 10);

        let largeWidth;
        let largeHeight;
        if (sketchWidth > sketchHeight) {
          largeWidth = getLargeWidthOfImage(sketchWidth, originalWidth);
          largeHeight = Math.round(getLargeHeightOfImage(largeWidth, originalWidth, originalHeight));
        } else {
          largeHeight = getLargeHeightOfImageVertical(sketchHeight, originalHeight);
          largeWidth = getLargeWidthOfImageVertical(largeHeight, originalHeight, originalWidth);
        }


        spareLink.children[0].style.width = largeWidth + 'px';
        spareLink.children[0].style.height = largeHeight + 'px';

        backdrop.classList.add('active');
        backdrop.appendChild(spareLink);
        backdrop.addEventListener('click', (e) => {
          e.preventDefault();
          backdrop.innerHTML = '';
          backdrop.classList.remove('active');
        });
      });

      counter++;
    });
  }, [props.aboutContent]);

  return (
    <section className="about__main">
      <div className="about__main-main">
        <div id="backdrop"></div>
        <div className="border" dangerouslySetInnerHTML={{__html: props.aboutContent}}>
        </div>
      </div>
    </section>
  )
}

// export default withRouter(About);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
