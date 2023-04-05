import React, {useState} from 'react';
import styles from '@styles/Form.module.css';
import {API_URL} from "@/config";

type ImageUploadType = {
  evtId: string;
  imageUploaded: () => void;
}

const ImageUpload: React.FC<ImageUploadType> = ({
  evtId,
  imageUploaded,
}) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('refId', evtId);
    formData.append('ref', 'api::event.event');
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData
    });

    if(res.ok) {
      imageUploaded()
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload event image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange}/>
          <input type="submit" value="Upload" className="btn"/>
        </div>
      </form>

    </div>
  );
};

export default ImageUpload;