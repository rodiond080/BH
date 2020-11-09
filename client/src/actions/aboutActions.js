import {
  GET_ABOUT_INIT, GET_ABOUT_SUCCESS, GET_ABOUT_ERROR, TOGGLE_BACKDROP_ACTIVE
} from "../_constants/aboutConstants";

export function toggleBackdropActive(backdropActive) {
  return (dispatch) => {
    dispatch(success(backdropActive));
  }

  function success(backdropActive) {
    return {
      type: TOGGLE_BACKDROP_ACTIVE,
      backdropActive: !backdropActive
    }
  }
}

function getWidth() {
  if (window.innerWidth > 1240) {
    return window.innerWidth / 3;
  } else if (window.innerWidth < 1240 && window.innerWidth > 900) {
    return window.innerWidth / 2;
  } else {
    return window.innerWidth;
  }
}

function getHeight(incomingWight, incomingHeight) {
  const newWidth = getWidth(incomingWight);
  const newHeight = (newWidth * incomingHeight) / incomingWight
  return newHeight;
}


export function getAboutContent() {
  return (dispatch) => {
    try {
      dispatch(init())
      fetch('/api/adm/about/getaboutcontent', {
        method: 'POST'
      })
        .then(res => res.json())
        .then((res) => {
          const workingDiv = document.createElement('div');
          workingDiv.innerHTML = res.aboutContent;
          const imageTags = workingDiv.getElementsByClassName('admin__about-image');

          let counter = 0;
          Array.from(imageTags).forEach(imageTag => {
            imageTag.style.width = getWidth(res.imgSizes[counter].width) + 'px';
            imageTag.style.height = getHeight(res.imgSizes[counter].width, res.imgSizes[counter].height) + 'px';


            const linkTag = document.createElement('a');
            linkTag.classList.add('about__image-link');
            linkTag.style.cursor = 'pointer';
            imageTag.before(linkTag);
            linkTag.appendChild(imageTag);
            // console.log(linkTag)
            linkTag.addEventListener('click', (e) => {
              e.preventDefault();
            }, false);

            imageTag.classList.remove('admin__about-image');
            counter % 2 === 0 ? imageTag.style.float = 'left' : imageTag.style.float = 'right';
            counter++;
          });

          dispatch(success({
            admAboutContent: workingDiv.innerHTML,
            imageSizes: res.imgSizes
          }));
        })
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: GET_ABOUT_INIT,
      loading: true
    }
  }

  function success(result) {
    return {
      type: GET_ABOUT_SUCCESS,
      aboutContent: result.admAboutContent,
      imageSizes: result.imageSizes,
      loading: false
    }
  }

  function error(error) {
    return {
      type: GET_ABOUT_ERROR,
      error: error,
      loading: false
    }
  }
}
