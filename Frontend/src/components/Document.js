import React, { useState } from 'react'

const Document = () => {
  const [img, setImg] = useState('');
  const formData = new FormData();
  formData.append("documents", img)
  function handleClick() {
    fetch("http://localhost:5000/api/auth/doc", {
      method: 'POST',
      body: formData
    }).then((res) => {
      console.log(res.msg)
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div>
      <input onChange={(e) => (e.target.files[0])} type='file' />
      <button onClick={handleClick}>Upload</button>
    </div>
  )
}

export default Document;
