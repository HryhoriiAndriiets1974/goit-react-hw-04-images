import { Component } from "react";
import Searchbar from "./Searchbar";
import imagesApi from '../Services/imagesApi';
import ImageGallery from "./ImageGallery";
import Loader from './Loader/Loader';
import BtnLoadMore from "./Button/Button";
import Modal from "./Modal";
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    imageQuery: '',
    images: [],
    currentPage: 1,
    isLoader: false,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const {imageQuery, currentPage} = this.state;
    if (prevState.imageQuery !== imageQuery) {
      this.searchImages();
    }
    if (prevState.currentPage < currentPage) {
      this.loadMoreImages(currentPage);
    }
  };

  handleFormSubmit = imageQuery => {
    this.setState({
      imageQuery: imageQuery,
      images: [],
      currentPage: 1,
    })
  };

  searchImages = () => {
    this.setState({
      status: 'pending',
      images: [],
    });
    this.loadMoreImages();
  };

  loadMoreImages = () => {
    this.setState({status: 'pending'});
    const {imageQuery, currentPage} = this.state;
    imagesApi
      .fetch(imageQuery, currentPage)
      .then(images =>{
        if (images.length === 0) {
          toast.error('Sorry, there are no more images matching your search query!!!');
          this.setState({status: 'idle'})
        } else
            this.setState(prevState => ({
              images: [...prevState.images, ...images],
              status: 'resolved',
            }));
      })
      .catch(error => this.setState({error, status: 'rejected'}));
  }

  onBtnClick() {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }))
  };

  getlargeImageURL = imageUrl => {
    this.setState({
      largeImageURL: imageUrl,
    })
    this.toogleModal();
  };

  toogleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }))
  };

render() {
  const {images, status, error, showModal, largeImageURL} = this.state;
    return (
    <div className={css.app}>
      <Searchbar propsQuery={this.handleFormSubmit} />
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
        imagesClick={this.getlargeImageURL}
      />}
      {status ==='pending' && <Loader/>}
      {status === 'resolved' && (
        <BtnLoadMore onClick={() => this.onBtnClick()}
      />)}
      {showModal && (
        <Modal
          src={largeImageURL}
          onClick={this.toogleModal}
        />
      )}
    </div>
  );
}

};

export default App;
