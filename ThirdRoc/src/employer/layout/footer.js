import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import PerfectScrollbar from'../../assets/js/p-scroll1';
import { useEffect } from "react"

export const Footer = () => {
  useEffect(() => {
    getSideBar()
  }, [])
  const getSideBar = () => {
    const script = document.createElement("script")

    script.src =
      "/assets/js/sidemenu.js"

    script.async = true 
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }
  setTimeout(
      function() {
           new PerfectScrollbar('.app-sidebar', {
            useBothWheelAxes:true,
            suppressScrollX:true,
          })
      }
      .bind(this),
      500
  );
    return (
      <>
       <footer className="footer">
         <div className="container">
            <div className="row align-items-center flex-row-reverse">
               <div className="col-md-12 col-sm-12 text-center"> Copyright © 2023 
			   <Link to="">ThirdRoc</Link> All rights reserved </div>
            </div>
         </div>
      </footer>
      </>
    )
  }
  
  export default Footer;
  