import {BallTriangle} from "react-loader-spinner";
import css from './Loader.module.css';

const Loader = () => {
  return (
    <section className={css.loader}>
      <BallTriangle
        color="#3f51b5"
        height={300}
        width={300}
        ariaLabel="loading"
      />
    </section>
  )
};

export default Loader;
