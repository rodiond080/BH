import React, {useEffect} from 'react';


const AboutContent = (props) => {

  return (
    <div className="border" dangerouslySetInnerHTML={{__html: props.aboutContent}}></div>
  )
}

export default AboutContent;
