import Logo from '../assets/images/OBB_Red_Logo_White.png';
import '../assets/styles/Global.css';
const Spinner = () => (
  <div className='spinner-bg'>
    <div className='spinner-border' role='status'>
      {/* <span className='sr-only'>Loading...</span> */}
      {/* <span className='sr-only'> */}
      <img src={Logo} alt='onboarding' className='img-fluid' />
      {/* </span> */}
    </div>
  </div>
);

export default Spinner;
