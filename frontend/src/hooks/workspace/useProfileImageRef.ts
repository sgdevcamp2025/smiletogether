import { useRef, useState } from 'react';

const useProfileImageRef = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImg = () => {
    if (!imgRef.current || !imgRef.current.files) return;
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgFile(reader.result as string);
      imgRef.current!.value = '';
    };
  };

  return { imgFile, saveImg, imgRef };
};

export default useProfileImageRef;
