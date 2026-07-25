import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Riya Singh</span>
        👋
        <br />
        Welcome to <span className='font-semibold mx-2 text-white'>DevVerse</span>
        <br />
        Where Engineering Meets Design
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Worked with many companies <br /> and built expertise across skills & technology
        </p>

        <Link to='/skills' className='neo-brutalism-white neo-btn'>
          Explore Skills Island 
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Led & contributed to multiple projects across tech companies. <br /> Curious about the impact?
        </p>

        <Link to='/experience' className='neo-brutalism-white neo-btn'>
          Explore Experience Island 
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Need a project done or looking for a dev? <br/> I'm just a few keystrokes away
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Explore Projects Island 
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
