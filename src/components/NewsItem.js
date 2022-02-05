import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
export class NewsItem extends Component {
  render() {
    let {title, description,urlToImage,newsUrl,author,publishedAt,source}=this.props;
    return( 
        <div>

        <div className="container">
        <div className="card">
          <img src={urlToImage} className="card-img-top" alt="image not found" />
         <div className="card-body">
           <h5 className="card-title">{title} <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{zIndex: 0, left:'90%'}}>{source}</span></h5>
           <p className="card-text">
               {description}
           </p>

<p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
           <a href={newsUrl} className="btn btn-sm btn-dark">
             Read More
           </a>
         </div>
       </div>
      
        </div>
       
   </div>
    )
  }
}

export default NewsItem;
