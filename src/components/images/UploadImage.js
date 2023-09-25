import React, { useState } from 'react';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
        const response = await fetch('http://localhost:1500/upload', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          

      if (response.status === 200) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default UploadImage;
