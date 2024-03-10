import React from 'react';
import { Grid } from 'react-loader-spinner';

const Loader = () => {
  return <Grid
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="grid-loading"
    radius="12.5"
    wrapperStyle={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
    wrapperClass="grid-wrapper"
  />
  
}

export default Loader;