import { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import imagesApi from '../Services/imagesApi';
import ImageGallery from "./ImageGallery";
import Loader from './Loader/Loader';
import BtnLoadMore from "./Button/Button";
import Modal from "./Modal";
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [imageQuery, setImageQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!imageQuery) {
      return;
    }

    const searchImages = () => {
      setStatus('pending');
      setImages([]);
      loadMoreImages();
  };

    const loadMoreImages = () => {
      setStatus('pending');
      imagesApi
        .fetch(imageQuery, page)
        .then(images => {
          console.log(images);
          console.log(images.length);
          if (images.length === 0) {
            toast.error('Sorry, there are no more images matching your search query!!!');
            setStatus('idle');
          } else if (images.length < 12) {
            setImages(prevState => [...prevState, ...images]);
            toast.error('Sorry, there are no more images matching your search query!!!');
            setStatus('idle');
          } else {
                setImages(prevState => [...prevState, ...images]);
                setStatus('resolved');
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }

    setStatus('pending');
    if (page === 1) {
      searchImages();
    } else {
      loadMoreImages();
    }

  }, [page, imageQuery]);

  function handleFormSubmit(imageQuery) {
    setPage(1);
    setImageQuery(imageQuery);
    setImages([]);
  }


  const onBtnClick = () => {
    setPage(page + 1);
  };

  const getlargeImageURL = imageUrl => {
    setLargeImageURL(imageUrl);
    toogleModal();
  };

  const toogleModal = () => {
      setShowModal(!showModal);
  };

  return (
    <div className={css.app}>
      <Searchbar propsQuery={handleFormSubmit} />
      <ToastContainer autoClose={5000} />
      {status === 'rejected' && (
        <div role="alert">
          <p>
            {error.message}
          </p>
        </div>
      )}
      {images.length !== 0 &&
        <ImageGallery
        images={images}
        imagesClick={getlargeImageURL}
      />}
      {status ==='pending' && <Loader/>}
      {status === 'resolved' && (
        <BtnLoadMore onClick={() => onBtnClick()}
      />)}
      {showModal && (
        <Modal
          src={largeImageURL}
          onClick={toogleModal}
        />
      )}
    </div>
  );

};

export default App;
