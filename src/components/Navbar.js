
import logo from "../assets/logo.png";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";

export default function Navbar(props) {

  return (
    <header className={props.lightMode ? "lightMode" : ""}>
      <nav>
        <img src={logo} className="logo" alt="logo" />
        <h1>Quizzical</h1>
      </nav>
      <div className="toggler">
        <p className="toggler--light"><img src={sun} style={{ width: 25, paddingTop: '3px' }} alt="sun" /></p>
        <div className="toggler--slider" onClick={props.toggle}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark"><img src={moon} style={{ width: 25, paddingTop: '3px' }} alt="moon" /></p>
      </div>

    </header>
  )
}