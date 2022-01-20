import React, { useEffect } from 'react';
import useStorage from './UseStorege';

const ProgressBar = ({ file, setFile,setImg }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      console.log(url);
      setFile(null);
      setImg(url);
    }
    // eslint-disable-next-line
  }, [url, setFile]);

  return (
    <div>
      {progress} %
    </div>
  );
} 

export default ProgressBar;