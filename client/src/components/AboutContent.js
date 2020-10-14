import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {getAboutContent } from "../actions/aboutActions";
import {connect} from "react-redux";
import {toggleBackdropActive} from "../actions/aboutActions";
import Backdrop from "../components/Backdrop/Backdrop";

// function mapStateToProps(state) {
//   return {
//     aboutContent: state.aboutReducer.aboutContent,
//     imageSizes: state.aboutReducer.imageSizes,
//     backdropActive: state.menuReducer.backdropActive
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     getAboutContent: () => dispatch(getAboutContent()),
//     toggleBackdropActive: (backdropActive) => dispatch(toggleBackdropActive(backdropActive))
//   }
// }

const AboutContent = (props) => {
  // useEffect(() => {
    // props.getAboutContent();
  // }, [props.aboutContent]);

  return (
    <div className="border" dangerouslySetInnerHTML={{__html: props.aboutContent}}></div>
  )
}

// export default withRouter(About);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutContent));
export default AboutContent;
