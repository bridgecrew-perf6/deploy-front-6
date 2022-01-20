import React,{useState} from 'react'
import ProgressBar from './ProgressBar';
import {BiUpload} from 'react-icons/bi'
import '../../Components/Profile.css'
export default function Up({setImg}) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
  //
    const types = ['image/png', 'image/jpeg'];
    //
    const handleChange = (e) => {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        setFile(selected);
        setError('');
      } else {
        setFile(null);
        setError('Please select an image file (png or jpg)');
      }
    };
    return (
      <form>
        <label>
          <input id='fileUpdateInput'  type="file" onChange={handleChange} />
          <label  htmlFor="fileUpdateInput"> <BiUpload className='iconUplouad'/> </label>
          {/* htmlFor تخلي الليبل يحل محل الشيء اللي ابي اضغطة مثل الاينبوت هنا  */}
          {/* htmlFor in html == for  */}
          <span>+</span>
        </label>
        <div className="output">
          { error && <div className="error">{ error }</div>}
          { file && <div>{ file.name }</div> }
          { file && <ProgressBar file={file} setFile={setFile} setImg={setImg} /> }
        </div>
      </form>
    );
}
