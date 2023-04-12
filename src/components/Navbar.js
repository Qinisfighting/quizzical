
import logo from "../assets/logo.png";

export default function Navbar(props) {
    return (
      <header className={props.lightMode ? "lightMode" : ""}>
       <nav>
         <img src={logo} className="logo" alt="logo" />
         <h1>Quizzical</h1>
       </nav>
       <div className="toggler">
        <p className="toggler--light">Light</p>
        <div className="toggler--slider" onClick={props.toggle}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
      
      </header>  
    )
}