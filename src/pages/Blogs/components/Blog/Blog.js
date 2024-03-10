import React from 'react'
import Card from './../../../../shared/components/Card/Card'

const Blog = props => {
  return (
    <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
        <a href={props.url} target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
        <Card >
          {props.imgUrl ? <img src={props.imgUrl} alt='Blog' /> : null}
            <div className='px-2 pt-2'>
              <h4>{props.title}</h4>
              <p>{props.description}</p>
            </div>
        </Card>
        </a>
    </div>
  );
  
}

export default Blog