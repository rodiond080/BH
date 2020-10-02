import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {getAboutContent} from "../actions/aboutActions";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    aboutContent: state.aboutReducer.aboutContent,
    imageSizes: state.aboutReducer.imageSizes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAboutContent: () => dispatch(getAboutContent()),
  }
}

const About = (props) => {
  // console.log(props.imageSizes);

  useEffect(() => {
    props.getAboutContent();
    Array.from(document.getElementsByTagName('a')).forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        a.children[0].classList.add('active');
        // a.children[0].style.width='600px';
        // a.children[0].style.height='400px';
        // console.log(2)
      })
    })


  }, [props.aboutContent]);

  return (
    <section className="about__main">
      <div className="about__main-main">
        <div className="border" dangerouslySetInnerHTML={{__html: props.aboutContent}}></div>


        {/*<img src="../../public/images/about/1500pic4.jpg" alt=""/>*/}
        
      </div>
    </section>
  )
}

// export default withRouter(About);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
