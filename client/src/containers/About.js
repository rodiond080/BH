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
  console.log(props.imageSizes);

  useEffect(() => {
    props.getAboutContent();
  }, [props.aboutContent]);

  return (
    <section className="about__main">
      <div className="about__main-main">
        <div className="border" dangerouslySetInnerHTML={{__html: props.aboutContent}}></div>
      </div>
    </section>
  )
}

// export default withRouter(About);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
