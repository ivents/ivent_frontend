import "../styles/carousel.css";
import vid1 from "/videos/video1.mp4";
import vid2 from "/videos/video2.mp4";
import vid3 from "/videos/video3.mp4";
import vid4 from "/videos/video4.mp4";
import vid5 from "/videos/video5.mp4";

const HeaderCarousel = () => {
  return (
    <div className="outer-wrapper">
      <div className="s-wrap s-type-1" role="slider">
        <input type="radio" id="s-1" name="slider-control" defaultChecked />
        <input type="radio" id="s-2" name="slider-control" />
        <input type="radio" id="s-3" name="slider-control" />
        <input type="radio" id="s-4" name="slider-control" />
        <input type="radio" id="s-5" name="slider-control" />
        <ul className="s-content">
          <li className="s-item s-item-2">
            <video src={vid1} loop autoPlay muted></video>
          </li>
          <li className="s-item s-item-2">
            <video src={vid2} loop autoPlay muted></video>
          </li>
          <li className="s-item s-item-3">
            <video src={vid3} loop autoPlay muted></video>
          </li>
          <li className="s-item s-item-4">
            <video src={vid4} loop autoPlay muted></video>
          </li>
          <li className="s-item s-item-5">
            <video src={vid5} loop autoPlay muted></video>
          </li>
        </ul>
        <div className="s-control">
          <label className="s-c-1" htmlFor="s-1"></label>
          <label className="s-c-2" htmlFor="s-2"></label>
          <label className="s-c-3" htmlFor="s-3"></label>
          <label className="s-c-4" htmlFor="s-4"></label>
          <label className="s-c-5" htmlFor="s-5"></label>
        </div>
        <div className="s-nav">
          <label className="s-nav-1 right" htmlFor="s-2"></label>
          <label className="s-nav-2 left" htmlFor="s-1"></label>
          <label className="s-nav-2 right" htmlFor="s-3"></label>
          <label className="s-nav-3 left" htmlFor="s-2"></label>
          <label className="s-nav-3 right" htmlFor="s-4"></label>
          <label className="s-nav-4 left" htmlFor="s-3"></label>
          <label className="s-nav-4 right" htmlFor="s-5"></label>
          <label className="s-nav-5 left" htmlFor="s-4"></label>
        </div>
      </div>
    </div>
  );
};

export default HeaderCarousel;
