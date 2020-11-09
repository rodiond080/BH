import React from 'react';

export const Crumbs = (props)=>{

  return(
      <div className="product__main-heading-bg">
        <div className="border">
          <div className="product__main-heading">
            <h3>{props.title}</h3>
            <div>
              {props.crumbs.map((crumb, key) => {
                return props.crumbs.length -1 ===key
                  ? <span key={key}>{crumb.name}</span>
                  : <a key={key} href={crumb.path} >{crumb.name} / </a>
              })}
            </div>
          </div>
        </div>
      </div>
  )
}
