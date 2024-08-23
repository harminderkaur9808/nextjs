import { useState } from "react";
import Link from "next/link";
import DividerWithText from "@/components/DividerWithText";
import '../styles/style-r.css';
import { useEffect } from "react";
import Image from "next/image";



export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLangBox, setShowLangBox] = useState<boolean>(false);
  const [showUserBox, setShowUserBox] = useState(false);
  const [showCartBox, setShowCartBox] =  useState<boolean>(false);
  const [showShipPopup, setShowShipPopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [clickedDiv, setClickedDiv] = useState<number | null>(null);
  const [showNextContent, setShowNextContent] = useState(true);

  // const handleLangMouseOver = () => setShowLangBox(true);
  // const handleLangMouseOut = () => setShowLangBox(false);
  const handleUserMouseOver = () => setShowUserBox(true);
  const handleUserMouseOut = () => setShowUserBox(false);
  const handleCartMouseOver = () => setShowCartBox(true);
  const handleCartMouseOut = () => setShowCartBox(false);
  const handleAddressClick = () => setShowShipPopup(true);
  

  const closePopup = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).classList.contains('ship-popup')) {
      setShowShipPopup(false);
    }
  };

  const toggleSidebar = () => {
    const isOpeningSidebar = !showSidebar; // Determine if the sidebar is being opened
    setShowSidebar(isOpeningSidebar);
    setShowNextContent(!isOpeningSidebar); // Hide next-content when sidebar is opened
  };
  
  const handleMouseEnter = (index: number) => {
    setActiveDiv(index);
  };

  const handleMouseLeave = () => {
    setActiveDiv(null);
  };

  const handleClick = (index: number) => {
    setClickedDiv(clickedDiv === index ? null : index);
  };

  const handleBackBtnClick = () => {
    setShowSidebar(true);
    setShowNextContent(false);
  };
  

  const messages = [
    '24/7 Service Available',
    'Free Standard Shipping',
    'Subscribe to Enjoy 10% OFF',
    '90 Days Free Return'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // change message every 3 seconds
    return () => clearInterval(intervalId);
  }, [messages.length]);

// ***************************************************************************************************************************************************************
const [hovered, setHovered] = useState(false);

const handleMouseOver = () => {
  setShowUserBox(true);
  setHovered(true);
};

const handleMouseOut = () => {
  if (!hovered) {
    setShowUserBox(false);
  }
};

const handleUserBoxMouseOver = () => {
  setHovered(true);
};

const handleUserBoxMouseOut = () => {
  setHovered(false);
  if (!document.querySelector('.user-box:hover') && !document.querySelector('.divider-with-text:hover')) {
    setShowUserBox(false);
  }
};

const handleButtonClick = () => {
  setShowUserBox(false);
};
//  *********************************

// Show the cart box
  // Show the cart box
  const handleMouseOverCartDiv = () => {
    setShowCartBox(true);
  };

  // Hide the cart box if the mouse is leaving both the cart div and cart box
  const handleMouseOutCartDiv = (e: React.MouseEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || (!relatedTarget.closest('.cart-box') && !relatedTarget.closest('.cart-div'))) {
      setShowCartBox(false);
    }
  };

  // Show the cart box
  const handleMouseOverCartBox = () => {
    setShowCartBox(true);
  };

  // Hide the cart box if the mouse is leaving both the cart box and cart div
  const handleMouseOutCartBox = (e: React.MouseEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || (!relatedTarget.closest('.cart-box') && !relatedTarget.closest('.cart-div'))) {
      setShowCartBox(false);
    }
  };



  // ******************************************** Currency popup
    // Show the language box
    const handleMouseOverLangDiv = () => {
      setShowLangBox(true);
    };
  
    // Show the language box
    const handleMouseOverLangBox = () => {
      setShowLangBox(true);
    };
  
    // Hide the language box if the mouse is leaving both the language div and the language box
    const handleMouseOutLang = (e: React.MouseEvent<HTMLDivElement>) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget || (!relatedTarget.closest('.lang-box') && !relatedTarget.closest('.lang-trans-div'))) {
        setShowLangBox(false);
      }
    };


    // Counter in the pop **********************************************************************************************

    const [timeLeft, setTimeLeft] = useState<number>(5 * 24 * 60 * 60); // 5 days in seconds

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
  
  return (
    <main>
    <div className="header">
      <div className="head-container">
        <div className="top-bar">
        {messages.map((message, index) => (
    <div
      key={index}
      className={`header-item ${index === currentIndex ? 'active' : ''}`}
      style={{ transform: `translateY(${(index - currentIndex) * 50}%)` }}
    >
      {message}
    </div>
  ))}
        </div>
      </div>

      <div className="header-second-bar">
        <div className="container logo-bar">
          <div className="left-side">
          <img
            className="sidebar-icon"
            src="/images/menu-bar.svg"
            alt="Menu"
            onClick={toggleSidebar}
          />
            <img className="main-logo" src="/images/logo.png" width={70} height={50} alt="" />
            <div className="address-div" onClick={handleAddressClick}>
              <img
                src="/images/address-icon.svg"
                width={20}
                height={20}
                alt=""
              />
              <p>Hello<br /> Select address</p>
            </div>
            {showShipPopup && (
              <div className="ship-popup" onClick={closePopup}>
                <div className="popup-box" onClick={(event) => event.stopPropagation()}>
                  <img className="close-icon" src="/images/close.svg" alt="" onClick={() => setShowShipPopup(false)} />
                  <h3>Ship Order To:</h3>
                  <p>A-Premium can ship to the USA only, except for Alaska, Hawaii, Puerto Rico, and Guam.
                    Does not ship to US Protectorates, PO Box, mailbox, and APO/FPO addresses.</p>
                  <div className="zip-code-sec">
                    <h4>Zip Code</h4>
                    <div className="main-form">
                      <div className="zip-code-field">
                        <input type="number" name="code" id="zip-code" />
                      </div>
                      <div className="zip-code-field">
                        <input type="number" name="code" id="zip-code" />
                      </div>
                      <div className="zip-code-field">
                        <input type="number" name="code" id="zip-code" />
                      </div>
                      <div className="zip-code-field">
                        <input type="number" name="code" id="zip-code" />
                      </div>
                      <div className="zip-code-field">
                        <input type="number" name="code" id="zip-code" />
                      </div>
                    </div>
                    <div className="submit-buttons">
                      <button className="reset-btn">Reset</button>
                      <button className="apply-btn">Apply</button>
                    </div>
                    <p className="end-text">Enter the Zip Code to view the estimated delivery time of the product</p>
                  </div>
                </div>
              </div>
            )}
          </div>
{/*  Cueewncy Open and close  */}
<div className="right-side">
      <div
        onMouseOver={handleMouseOverLangDiv}
        onMouseOut={handleMouseOutLang}
        className="lang-trans-div"
      >
        <img
          className="flag"
          src="/images/flag-us.png"
          width={40}
          height={30}
          alt="US Flag"
        />
        <p>USA</p>
        <img src="/images/down-angle.svg" width={15} alt="Down Arrow" />
      </div>

      <div
        className={`lang-box ${showLangBox ? 'showCurrencypop' : 'hideCurrencypop'}`}
        onMouseOver={handleMouseOverLangBox}
        onMouseOut={handleMouseOutLang}
      >
        <p>Ship to</p>
        <div className="ship-to-div">
          <div className="input-div">
            <img
              src="/images/flag-us.png"
              width={40}
              height={30}
              alt="US Flag"
            />
            <p>United States</p>
            <img
              className="down-arrow"
              src="/images/down-angle-black.svg"
              width={20}
              alt="Down Arrow"
            />
          </div>
        </div>

        <div className="currency-div">
          <p>Currency</p>
          <div className="input-div">
            <p>USD-US Dollar</p>
          </div>
        </div>
        <button className="save-btn mt-5">SAVE</button>
      </div>

            <button className="track-order-btn">Track Order</button>


            {/*  Main Popup Login SignUp. */}

            <div className="icons-div">
           {/*    <div
                onMouseOver={handleUserMouseOver}
                // onMouseOut={handleUserMouseOut}
                className="user-div"
              >
                <Link href="">
                  <img src="/images/user-icon.svg" alt="" />
                </Link>
              </div>
              <div className={`user-box ${showUserBox ? "show" : "hide"}`}>
                <h3>Welcome</h3>
                <a href="/Auth">
                <button className="sign-up-btn">Free Sign Up</button>
                </a>
                <a href="/Auth">
                <button className="login-btn">Login</button>
                </a>
                <DividerWithText />
                <button className="sign-google-btn">
                  <img src="/images/google-logo.png" width={20} height={20} alt="" />
                  Sign In With Google
                </button>
              </div> */}
 <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="user-div"
      >
        <Link href="#">
          <img src="/images/user-icon.svg" alt="User Icon" />
        </Link>
      </div>
      <div
        className={`user-box ${showUserBox ? 'show' : 'hide'}`}
        onMouseOver={handleUserBoxMouseOver}
        onMouseOut={handleUserBoxMouseOut}
      >
        <h3>Welcome</h3>
          <a  href="/Auth">
            <button className="sign-up-btn" onClick={handleButtonClick}>Free Sign Up</button>
          </a>
          <a  href="/Auth">
            <button className="login-btn" onClick={handleButtonClick}>Login</button>
          </a>
        <DividerWithText
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        />
        <button className="sign-google-btn" onClick={handleButtonClick}>
          <img src="/images/google-logo.png" width={20} height={20} alt="Google Logo" />
          Sign In With Google
        </button>
      </div>
    {/* .,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}

    <div
        onMouseOver={handleMouseOverCartDiv}
        // onMouseOut={handleMouseOutCartDiv}
        className="cart-div"
      >
        <Link href="#">
          <img src="/images/cart-icon.svg" alt="Cart Icon" />
        </Link>
      </div>
      <div
        className={`cart-box ${showCartBox ? 'show' : 'hide'}`}
        onMouseOver={handleMouseOverCartBox}
        onMouseOut={handleMouseOutCartBox}
      >
        <h3>Shopping Cart</h3>
        <section className="counter-main-cart">
      <div className="left-side">
        <p className="discount-text">
          ExampleDay<br />
          15% OFF Code: PD24
        </p>
      </div>
      <div className="center">
        <p className="days-left">5 Days</p>
        <p className="counter">{formatTime(timeLeft)}</p>
      </div>
      <div className="background-image">
        <Image
          src="/images/Popups/Maincarttimer.svg"
          layout="fill"
          objectFit="cover"
          alt="Cart Icon"
        />
      </div>
    </section>


        <div className="loading-div">
          <div className="cart-img-sec">
            <div className="cart-icon-img">
            <Image
        src="/images/Popups/Mainpopupadcart.svg"
        width={90}
        height={90} 
        alt="Cart Icon" 
      />
                  </div>
          </div>
          <div className="simple-text-with-link">
            <p>Looks like your cart is empty. <span style={{ color: '#da3b1f' }}>Go to store</span> to<br /> start shopping</p>
          </div>
        </div>
      </div>
    
              {/* ********** */}
          </div>
          </div>
        </div>
      </div>
{/* ************************************************************************************ */}
     
      <div className={`sidebar-div ${showSidebar ? "open" : "closed"}`}>
        <div className="close-icon-div">
        <img
            src="/images/sidebar-close.svg"
            alt="Close Sidebar"
            onClick={toggleSidebar}
          />
        </div>

        {showSidebar && (
        <div className="sidebar-menus">
         <div className="menu-div">
          <div className="menu-icons">
            <img src="/images/Live-chat.svg" alt="" />
            </div>
         <Link href="#">
                <p>Live Chat</p>
              </Link>
         </div>
         <div className="menu-div">
         <div className="menu-icons">
            <img src="/images/phone.svg" alt="" />
            </div>
         <Link href="#">
                <p>+1 888 374 5088</p>
              </Link>
         </div>
         <div className="menu-div">
         <div className="menu-icons">
            <img src="/images/help.svg" alt="" />
            </div>

            <a href="/Help-center">
            Help Center
            </a>

         </div>
         <div className="menu-div">
         <div className="menu-icons">
            <img src="/images/track-order.svg" alt="" />
            </div>
         <a href="/TrackOrderPage">
                Track Order
              </a>
         </div>
         <div className="menu-div">
         <div className="menu-icons">
            <img src="/images/account.svg" alt="" />
            </div>
         <a href="/Auth">
                <span>My Account</span>&nbsp;&nbsp;&nbsp;
                <span className="badge">20% OFF</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-simple">Sign in</span>
              </a>
         </div>
         <div className="menu-div">
         <div className="menu-icons">
            <img src="/images/About.svg" alt="" />
            </div>
         <Link href="/about">
                <p>About Us</p>
              </Link>
         </div>
         <div className="menu-div">
         <div className="menu-icons">
            <img src="/images/blog.svg" alt="" />
            </div>
         <Link href="/BlogPage">
                <p>Blog</p>
              </Link>
         </div>

         <div className="categories-div">
          <div className="head-sec">
         <Link href="/">
            <h2>Categories</h2>
            {/* <img src="/images/open.svg" alt="" /> */}
            <img src="/images/close-1.svg" alt="" />
              </Link>
              </div>
            <div className="categories-links">

              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Automotive Tools & Supplies</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Motorcycle & Boat Parts</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">ATV, UTV & RV Parts</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Exterior</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Interior</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Heating & Cooling</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Body & Lamp Assembly</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Suspension & Steering</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Brake & Wheel Parts</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Drivetrain</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
              <div className="category-menu">
              <Link href="/">
              <div className="link-cate">
              <img src="/images/minus.svg" alt="" />
              <p className="category-name">Engine</p>
              </div>
              <img src="/images/angle-right.svg" alt="" />
              </Link>
              </div>
            </div>

        </div>

        </div>
        )}
        {/***************** click menu text *****************/}

        <div className={`next-content ${showNextContent ? '' : 'hide'}`}>
          <div className="top-head">
            <img 
            className="back-btn"
            src="/images/left-angle.svg" 
            width={10} 
            alt="" 
            onClick={handleBackBtnClick}
            />
            <div className="content-menu">
              <h3>Automotive Tools & Supplies</h3>
            </div>
          </div>

          <div className="specfic-div">
          <div 
          className="next-menu-1"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(1)}
        >
            <span>
              <img src="/images/Automotive_Tools_Supplies.png" alt="" />
            </span>
            <span className="next-sub-menu">Automotive Electrical Appliances</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 1 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
           </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 1 || clickedDiv === 1) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Automotive_Tools_Supplies.png" alt="" />
             </div>
             <div className="box-text">
             <p>Portable Car Fridge</p>
             </div>
             </div>
           </div>
          </div>

          <div className="specfic-div-2">
          <div 
            className="next-menu-2"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(2)}
          >
            <span>
              <img src="/images/Diagnostic_Service_Tools.png" alt="" />
            </span>
            <span className="next-sub-menu">Diagnostic Service Tools</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 2 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
          </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 2 || clickedDiv === 2) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Air_Leak_Test_Tool.png" alt="" />
             </div>
             <div className="box-text">
             <p>Air Leak Test Tool</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Code_Readers_&_Scanners.png" alt="" />
             </div>
             <div className="box-text">
             <p>Code Readers & Scanners</p>
             </div>
             </div>

           </div>
          </div>

        </div>

        {/********************** Second Category content page **************************/}

        <div className={`next-content ${showNextContent ? '' : 'hide'}`}>
          <div className="top-head">
          <img 
            className="back-btn"
            src="/images/left-angle.svg" 
            width={10} 
            alt="" 
            onClick={() => setShowNextContent(false)}
          />
            <div className="content-menu">
              <h3>Motorcycle & Boat Parts</h3>
            </div>
          </div>

          <div className="specfic-div">
          <div 
          className="next-menu-1"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(1)}
        >
            <span>
              <img src="/images/Inboard_Engines_&_Components.png" alt="" />
            </span>
            <span className="next-sub-menu">Inboard Engines & Components</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 1 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
           </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 1 || clickedDiv === 1) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Marine_Exhaust_Manifold.png" alt="" />
             </div>
             <div className="box-text">
             <p>Marine Exhaust Manifold</p>
             </div>
             </div>
           </div>
          </div>

          <div className="specfic-div-2">
          <div 
            className="next-menu-2"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(2)}
          >
            <span>
              <img src="/images/Motorcycle_Body_&_Frame.png" alt="" />
            </span>
            <span className="next-sub-menu">Motorcycle Body & Frame</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 2 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
          </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 2 || clickedDiv === 2) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Battery_Box_Cover.png" alt="" />
             </div>
             <div className="box-text">
             <p>Battery Box Cover</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Motorcycle_Fuel_Tank.png" alt="" />
             </div>
             <div className="box-text">
             <p>Plastic Body</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Plastic_Body.png" alt="" />
             </div>
             <div className="box-text">
             <p>Motorcycle Fuel Tank</p>
             </div>
             </div>

           </div>
          </div>

          <div className="specfic-div-3">
          <div 
          className="next-menu-3"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(3)}
        >
            <span>
              <img src="/images/Motorcycle_Brakes_&_Suspension_Parts.png" alt="" />
            </span>
            <span className="next-sub-menu">Motorcycle Brakes & Suspension Parts</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 3 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
           </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 3 || clickedDiv === 3) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Suspension_Lowering_Link.png" alt="" />
             </div>
             <div className="box-text">
             <p>Suspension Lowering Link</p>
             </div>
             </div>
           </div>
          </div>

          <div className="specfic-div-4">
          <div 
          className="next-menu-4"
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(4)}
        >
            <span>
              <img src="/images/Motorcycle_Engines_&_Parts.png" alt="" />
            </span>
            <span className="next-sub-menu">Motorcycle Engines & Parts</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 4 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
           </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 4 || clickedDiv === 4) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Balance_Shaft.png" alt="" />
             </div>
             <div className="box-text">
             <p>Balance Shaft</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Crankcase_Cover.png" alt="" />
             </div>
             <div className="box-text">
             <p>Crankcase Cover</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Engine_Cover_Case.png" alt="" />
             </div>
             <div className="box-text">
             <p>Engine Cover Case</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Programmable_Single_Fire_Electronic_Ignition.png" alt="" />
             </div>
             <div className="box-text">
             <p>Programmable Single Fire Electronic Ignition</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Stator_Generator_Rotor.png" alt="" />
             </div>
             <div className="box-text">
             <p>Stator Generator Rotor</p>
             </div>
             </div>


           </div>
          </div>

          <div className="specfic-div-5">
          <div 
          className="next-menu-5"
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(5)}
        >
            <span>
              <img src="/images/Motorcycle_Handlebars_Grips_&_Levers.png" alt="" />
            </span>
            <span className="next-sub-menu">Motorcycle Handlebars, Grips &<br/>Levers</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 5 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
           </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 5 || clickedDiv === 5) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Handlebars.png" alt="" />
             </div>
             <div className="box-text">
             <p>Handlebars</p>
             </div>
             </div>
           </div>
          </div>

          <div className="specfic-div-6">
          <div 
          className="next-menu-6"
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(6)}
        >
            <span>
              <img src="/images/Outboard_Engines_&_Components.png" alt="" />
            </span>
            <span className="next-sub-menu">Outboard Engines & Components</span>
            <span className="arrows-icon">
            <img src={clickedDiv === 6 ? "/images/angle-down.svg" : "/images/angle-up.svg"} width={20} alt="" />
           </span>
           </div>

           <div className={`open-boxes-div ${(activeDiv === 6 || clickedDiv === 6) ? 'show' : ''}`}>
             <div className="main-box">
             <div className="box-img">
             <img src="/images/view-all.svg" alt="" />
             </div>
             <div className="box-text">
             <p>View All</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Engine_Coupler.png" alt="" />
             </div>
             <div className="box-text">
             <p>Engine Coupler</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Marine_Drive_Shaft_Kit.png" alt="" />
             </div>
             <div className="box-text">
             <p>Marine Drive Shaft Kit</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Marine_Hydraulic_Power_Pump.png" alt="" />
             </div>
             <div className="box-text">
             <p>Marine Hydraulic Power Pump</p>
             </div>
             </div>

             <div className="main-box">
             <div className="box-img">
             <img className="category-imges" src="/images/Outboard_Oil_Tank_Assembly.png" alt="" />
             </div>
             <div className="box-text">
             <p>Outboard Oil Tank Assembly</p>
             </div>
             </div>

           </div>
          </div>


        </div>

      </div>

    </div>
    </main>
    
  );
}
