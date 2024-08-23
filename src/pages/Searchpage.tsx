import React, { useState ,useRef} from 'react';
import '../styles/Searchpage.css';
import Pagination from './Pagination'; // Adjust the path if necessary
import Productcrausallink from './Productcrausallink'
import Footer from './Footer';
import Header from './Header';
import SearchpageProduct from './SearchpageProduct';
import SearchpageProductFullwidth from './SearchpageProductFullwidth'
import Modal from './Modal';
import '../styles/style-a.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
// Dummy data
const categoriesProducts = [
  {
    name: 'Engine',
    products: [
      {
        name: 'Buy Main Engine',
        subProducts: ['Engine 1.1.1', 'Engine 1.1.2', 'Engine 1.1.3']
      },


    ]
  },
  {
    name: 'Product 2',
    products: [
      {
        name: 'Product 1.1',
        subProducts: ['Product 1.1.1', 'Product 1.1.2', 'Product 1.1.3']
      },
      {
        name: 'Product 1.2',
        subProducts: ['Product 1.2.1', 'Product 1.2.2']
      },
      {
        name: 'Product 1.3',
        subProducts: ['Product 1.3.1', 'Product 1.3.2']
      }
    ]
  },
  {
    name: 'Product 3',
    products: [
      {
        name: 'Product 1.1',
        subProducts: ['Product 1.1.1', 'Product 1.1.2', 'Product 1.1.3']
      },
      {
        name: 'Product 1.2',
        subProducts: ['Product 1.2.1', 'Product 1.2.2']
      },
      {
        name: 'Product 1.3',
        subProducts: ['Product 1.3.1', 'Product 1.3.2']
      }
    ]
  },
  {
    name: 'Product 4',
    products: [
      {
        name: 'Product 1.1',
        subProducts: ['Product 1.1.1', 'Product 1.1.2', 'Product 1.1.3']
      },
      {
        name: 'Product 1.2',
        subProducts: ['Product 1.2.1', 'Product 1.2.2']
      },
      {
        name: 'Product 1.3',
        subProducts: ['Product 1.3.1', 'Product 1.3.2']
      }
    ]
  },


];

const products = Array.from({ length: 70 }, (_, index) => ({
  image: '/images/Searchpageimg/Productoneimg.png',
  imagesechead: '/images/Searchpageimg/psectionimg12.svg',
  name: `4 Pcs Engine Motor & Engine Torque Strut Mount for 2005 Buick Terraza`,
  itemNumber: `item # 95383947969933303`,
  rating: "4",
  replacesPartNumber: "A2900, A2899, 2900, 2899, 10274661, 1",
  Engine: "3.9L V6 | 3.9L V6 | 3.9L V6 | 3.9L V6",
  price: `$75.99`,
  originalPrice: `$83.99`,
  details: 'More details for faster compatibility verification.',
  count: index + 1, // Unique count for each product starting from 1

}));

// Define TypeScript types
type FilterOption = {
  id: string;
  text: string;
  count: number;
};

type FilterCategory = {
  category: string;
  options: FilterOption[];
};

const filterOptions: FilterCategory[] = [
  {
    category: "Categories",
    options: [
      { id: '25to50', text: 'Front Axle Engine Subframe', count: 2314 },
      { id: '25to51', text: 'Engine Air Filter', count: 2315 },
      { id: '25to52', text: 'Knock Detonation Sensor', count: 2314 },
      { id: '25to53', text: 'Coolant Level Sensor', count: 2315 }
    ]
  },
  {
    category: "Price",
    options: [
      { id: "price1", text: "Less than $25", count: 13132 },
      { id: "price2", text: "$25 - $49.99", count: 17765 },
      { id: "price3", text: "$50 - $74.99", count: 13326 },
      { id: "price4", text: "$75 - $99.99", count: 10267 },
      { id: "price5", text: "$100 and up", count: 23703 }
    ]
  },
  {
    category: "Placement on vehicle",
    options: [
      { id: "place1", text: "Front", count: 13132 },
      { id: "place2", text: "Rear", count: 17765 },
      { id: "place3", text: "Left", count: 13326 },
      { id: "place4", text: "Right", count: 10267 },
    ]
  },
  {
    category: "Material",
    options: [
      { id: "mat1", text: "Plastic", count: 13132 },
      { id: "mat2", text: "Metal", count: 17765 },
      { id: "mat3", text: "Rubber", count: 13326 },
      { id: "mat4", text: "Composite", count: 10267 },
    ]
  },
  {
    category: "Color",
    options: [
      { id: "color1", text: "Black", count: 13132 },
      { id: "color2", text: "White", count: 17765 },
      { id: "color3", text: "Silver", count: 13326 },
      { id: "color4", text: "Red", count: 10267 },
    ]
  }
];

// Add these styles inline or in your CSS file

const SearchPage: React.FC = () => {

   // State to track which image is currently visible
   const [activeImage, setActiveImage] = useState<'first' | 'second'>('first');

   // Toggle function to switch images
   const toggleImage = () => {
     setActiveImage(activeImage === 'first' ? 'second' : 'first');
   };
  //  ************************************

  const [activeCategoryProducts, setActiveCategoryProducts] = useState<string | null>(null);
  const [activeSubProduct, setActiveSubProduct] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleCategoryClick = (name: string) => {
    setActiveCategoryProducts(name === activeCategoryProducts ? null : name);
    setActiveSubProduct(null); // Close sub-products when changing category
  };

  const handleProductClick = (productName: string) => {
    setActiveSubProduct(productName === activeSubProduct ? null : productName);
  };
  // Section hide and show
  const [activeSection, setActiveSection] = useState<'first' | 'second'>('second');

  // -------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [visibleCategories, setVisibleCategories] = useState<{ [key: number]: boolean }>({});
  const [showText, setShowText] = useState<{ [key: number]: boolean }>({});

  const toggleCategoryVisibility = (index: number) => {
    setVisibleCategories(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleImageClick = (index: number) => {
    setShowText(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
    toggleCategoryVisibility(index);
  };
// ****************************************************************************************************************



const [query, setQuery] = useState('');
const [suggestions, setSuggestions] = useState([
  'Year',
  'Make',
  'Model',
  'Part Type',
  'Part Number',
  'Another suggestion',
  'Yet another suggestion',
]);
const [showModal, setShowModal] = useState(false);

// State for dropdown selections
const [selectedYear, setSelectedYear] = useState<string>('');
const [selectedMake, setSelectedMake] = useState<string>('');
const [selectedModel, setSelectedModel] = useState<string>('');
const [selectedPartType, setSelectedPartType] = useState<string>('');
const [selectedPartNumber, setSelectedPartNumber] = useState<string>('');

// References for dropdowns
const makeRef = useRef<HTMLSelectElement>(null);
const modelRef = useRef<HTMLSelectElement>(null);
const partTypeRef = useRef<HTMLSelectElement>(null);
const partNumberRef = useRef<HTMLSelectElement>(null);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setQuery(value);

  // Filter suggestions based on input value
  if (value.trim() === '') {
    setSuggestions([]);
  } else {
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  }
};

const handleSearch = () => {
  // Handle the search functionality here
  console.log(`Searching for: ${query}`);
  // router.push('/Searchpage');

};

const handleSuggestionClick = (suggestion: string) => {
  // Set query to the clicked suggestion and clear suggestions
  setQuery(suggestion);
  setSuggestions([]);
};

const handleLeftAction = () => {
  // Show the modal on left button click
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};

// Handlers for dropdown changes
const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedYear(e.target.value);
};

const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedMake(e.target.value);
};

const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedModel(e.target.value);
};

const handlePartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedPartType(e.target.value);
};

const handlePartNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedPartNumber(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (selectedYear && selectedMake && selectedModel && selectedPartType && selectedPartNumber) {
    console.log('Form Submitted');
    console.log(`Year: ${selectedYear}`);
    console.log(`Make: ${selectedMake}`);
    console.log(`Model: ${selectedModel}`);
    console.log(`Part Type: ${selectedPartType}`);
    console.log(`Part Number: ${selectedPartNumber}`);
    setShowModal(false);
  } else {
    alert('Please make all selections');
  }
};
  return (
    <>
    
      <Header />
         <Modal show={showModal} handleClose={handleCloseModal}>
        <h2 className='heading1'>Select Your Vehicle</h2>
        <form onSubmit={handleSubmit} className="dropdown-form">
          <div className="modal-container">
            <Image src="/images/car98.png" alt="Year Icon" className="dropdown-icon" width={30} height={30} />
            <div className="dropdown-container">
              <select value={selectedYear} onChange={handleYearChange} required className="dropdown-select">
                <option className='opt' value="" disabled>Year</option>
                <option className='opt' value="2024">2024</option>
                <option className='opt' value="2023">2023</option>
                <option className='opt' value="2022">2022</option>
                <option className='opt' value="2021">2021</option>
                <option className='opt' value="2020">2020</option>
                <option className='opt' value="2019">2019</option>
              </select>
            </div>
            <div className="dropdown-container">
              <select ref={makeRef} value={selectedMake} onChange={handleMakeChange} required className="dropdown-select">
                <option className='opt' value="" disabled>Make</option>
                <option className='opt' value="Acura">Acura</option>
                <option className='opt' value="Audi">Audi</option>
                <option className='opt' value="BMW">BMW</option>
                <option className='opt' value="Mercedes-Benz">Mercedes-Benz</option>
                <option className='opt' value="Suzuki">Suzuki</option>
              </select>
            </div>
            <div className="dropdown-container">
              <select ref={modelRef} value={selectedModel} onChange={handleModelChange} required className="dropdown-select">
                <option className='opt' value="" disabled>Model</option>
                <option className='opt' value="A3">A3</option>
                <option className='opt' value="A3 Quattro">A3 Quattro</option>
                <option className='opt' value="A4 Allroad">A4 Allroad</option>
                <option className='opt' value="A4 Quattro">A4 Quattro</option>
                <option className='opt' value="A5 Sportback">A5 Sportback</option>
              </select>
            </div>
            <div className="dropdown-container">
              <select ref={partTypeRef} value={selectedPartType} onChange={handlePartTypeChange} required className="dropdown-select">
                <option className='opt' value="" disabled>Trim</option>
                <option className='opt' value="Engine">Komfort Sedan 4-door</option>
                <option className='opt' value="Transmission">Premium plus Sedan 4-door</option>
                <option className='opt' value="Transmission">Premium Sedan 4-door</option>
                <option className='opt' value="Transmission">Prestige Sedan 4-door</option>
                <option className='opt' value="Transmission">Progressive Sedan 4-door</option>
              </select>
            </div>
            <div className="dropdown-container">
              <select ref={partNumberRef} value={selectedPartNumber} onChange={handlePartNumberChange} required className="dropdown-select">
                <option className='opt' value="" disabled>Engine</option>
                <option className='opt' value="12345">12345</option>
                <option className='opt' value="67890">67890</option>
              </select>
            </div>
            <button className='subm' type="submit">GO</button>
          </div>
        </form>
      </Modal>
      <div className="Main-search-page">
        {/* Firsts Sections */}
        <div className='First-sections-m'>
          <div className="feature-section">
            {/* Features Section */}
            <div className="feature-item">
              <img src="/images/Searchpageimg/Imgfirsticon.svg" alt="90 Days Free Return" className="feature-icon" />
              <span className="feature-text">90 Days Free Return</span>
            </div>
            <div className="feature-item">
              <img src="/images/Searchpageimg/Imgfirsticon1.svg" alt="24/7 Service" className="feature-icon" />
              <span className="feature-text">24/7 Service</span>
            </div>
            <div className="feature-item">
              <img src="/images/Searchpageimg/Imgfirsticon2.svg" alt="Free Shipping" className="feature-icon" />
              <span className="feature-text">Free Shipping</span>
            </div>
            <div className="feature-item">
              <img src="/images/Searchpageimg/Imgfirsticon3.svg" alt="Fit Guaranteed" className="feature-icon" />
              <span className="feature-text">Fit Guaranteed</span>
            </div>
          </div>

          {/* Second Section */}
          <div className='First-sections-m'>
            <section className="second-main-s-m1">
              <div className="text-container">
                Select Your Vehicle To See Exact Fit Parts
              </div>
              <button className="add-vehicle-button" onClick={handleLeftAction}>
                Add Vehicle
                <img src="/images/Searchpageimg/raphael_car.svg" alt="Add Vehicle" className="feature-icon-vehicle" />
              </button>
            </section>
          </div>
        </div>

        {/* Sidebar with Filters */}
        <div className="search-page">
          <div className="sidebar">
            {/* <div className="categories">
              <text>Categories</text>
              <img className="main-logo" src="/images/Searchpageimg/catesgv01.svg" width={70} height={50} alt="" />
            </div> */}
            <div
              className="sidebar-Products01"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="categories001">
                <span>Categories</span>
                <img
                  className="main-logo-dojt"
                  src="/images/Searchpageimg/catesgv01.svg"
                  width={70}
                  height={50}
                  alt="Categories Logo"
                />
              </div>
              {showDropdown && (
                <div className="dropdown-container-main">
                  {categoriesProducts.map(category => (
                    <div
                      key={category.name}
                      className="dropdown-active"
                    >
                      <div
                        className="dropdown-header-active"
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.products.length > 0 && (
                          <span className={`dropdown-indicator ${activeCategoryProducts === category.name ? 'open' : 'closed'}`}>
                            {activeCategoryProducts === category.name ? '▼' : '►'}
                          </span>
                        )}
                        <span>{category.name}</span>

                      </div>
                      {activeCategoryProducts === category.name && (
                        <div className="dropdown-content-001">
                          {category.products.map(product => (
                            <div key={product.name} className="dropdown-item-c12">
                              <div
                                className="dropdown-header-active"
                                onClick={() => handleProductClick(product.name)}
                              >
                                {/* <img
                          src="/images/Searchpageimg/product-icon.svg"
                          className="product-icon"
                          alt="Product Icon"
                        /> */}
                                {product.subProducts.length > 0 && (
                                  <span className={`dropdown-indicator ${activeSubProduct === product.name ? 'open' : 'closed'}`}>
                                    {activeSubProduct === product.name ? '▼' : '►'}
                                  </span>
                                )}
                                <span>{product.name}</span>

                              </div>
                              {activeSubProduct === product.name && (
                                <div className="dropdown-subcontent-001">
                                  {product.subProducts.map(subProduct => (
                                    <div key={subProduct} className="dropdown-subitem-c12">
                                      {subProduct}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Close sidebar */}
            <div className="filters">
              <div className="filter-options">
                {filterOptions.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="filter-category">
                    <div className="category-header">
                      <h3>{category.category}</h3>
                      {showText[categoryIndex] ? (
                        <img
                          className="main-logoplusminu"
                          src="/images/Searchpageimg/Plus-icon121.svg"
                          width={70}
                          height={50}
                          alt="Hide"
                          onClick={() => handleImageClick(categoryIndex)}
                        />
                      ) : (
                        <img
                          className="main-logoplusminu"
                          src="/images/Searchpageimg/minus121.svg"
                          width={70}
                          height={50}
                          alt="Show"
                          onClick={() => handleImageClick(categoryIndex)}
                        />
                      )}
                    </div>
                    <div className={`category-options ${visibleCategories[categoryIndex] ? 'visible' : ''}`}>

                      {category.category !== "Price" && (
                        <div className="input-group-Main">
                          <input
                            className="input-group"
                            type="search"
                            id="search"
                            name="search"
                          />
                        </div>
                      )}
                      {category.options.map((option) => (
                        <div key={option.id} className="filter-option">
                          <input type="checkbox" id={option.id} />
                          <label className="filter-option-text" htmlFor={option.id}>{option.text}</label>
                          <span>
                            <label className="filter-option-text" htmlFor={option.id}>({option.count})</label>
                          </span>
                        </div>
                      ))}
                      {/* price sec */}
                      {category.category === "Price" && (
                        <div className="price-filter-container">
                          <div className="input-group-price">
                            <input
                              className="input-group-price-min"
                              type="number"
                              id="minPrice"
                              name="minPrice"
                              placeholder="Min"
                            />
                            <input
                              className="input-group-price-max"
                              type="number"
                              id="maxPrice"
                              name="maxPrice"
                              placeholder="Max"
                            />
                            <button className="go-button">GO</button>
                          </div>
                        </div>
                      )}
                      {/* price sec */}

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Products Section */}
          
          {/* counter and layout section */}

          <div className='Main-Container-products'>
          <div>
              <section className="items-display-section-01">
                <div className="items-display-left-section">
                  <span>Show items: </span>
                  <div className='Items-displaybutton-changelayout'>

                    <button className="items-display-items-button">20</button>
                    <button className="items-display-items-button">40</button>
                    <button className="items-display-items-button">70</button>

                  </div>

                </div>

                                  {/* <span>Total posts: </span> */}

                <div className="items-display-right-section">
                  <select className="items-display-dropdown">
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating: High to Low</option>
                  </select>
                  {/* <img src="/images/Searchpageimg/Group 1000005137.svg" alt="Icon 1" className="icon-image0011" />
              <img src="/images/Searchpageimg/Group 1000005138.svg" alt="Icon 2" className="icon-image0011" /> */}


<div className='Main-Layout-box-G'>
      {/* Icons for toggling */}
      <img
        src={activeSection === 'second' ? "/images/Searchpageimg/Group 1000005137.svg" : "/images/Searchpageimg/Group 1000005137.svg"}
        alt="Icon 2"
        className="icon-image0011"
        onClick={() => setActiveSection('second')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={activeSection === 'first' ? "/images/Searchpageimg/Replaceimagepro.svg" : "/images/Searchpageimg/Replaceimagepro.svg"}
        alt="Icon 1"
        className="icon-image0011"
        onClick={() => setActiveSection('first')}
        style={{ cursor: 'pointer' }}
      />
    
      </div>



                </div>
              </section>
              <div className="products">
              </div>
              <div>
                {/* Sections */}
                <section className='Section-boxes-producta'>
                  {activeSection === 'first' && <SearchpageProduct />}
                </section>

                <section className='Section-boxes-producta'>
                  {activeSection === 'second' && <SearchpageProductFullwidth />}
                </section>
              </div>
            </div>

            {/* <section className='Section-boxes-producta'>

          {currentProducts.map((product, index) => (

            <div key={index} className="product-box">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <div className='Imageheadsec'>
                  <img src={product.imagesechead} alt="" />
                </div>
                <div className='Product-name-sec'>
                  <h3 className="product-name">{product.name}</h3>
                </div>
                <p className="product-item-number">{product.itemNumber}</p>
                <div className="product-rating">
                  Quantity
                  {[...Array(1)].map((_, starIndex) => (
                    <span key={starIndex}>★</span>
                  ))}
                  <span className="rating-text">{product.rating}</span>
                  <span className="rating-text">{product.count}</span>
                </div>
                <p className="product-replaces-part-number">Replaces part number: <span>{product.replacesPartNumber}</span></p>
                <p className="product-engin-details">Engine: <span>{product.Engine}</span></p>

                <div className='Main-thir12'>
                  <section className='main1-first12'>
                    <img src="/images/Searchpageimg/raphael_car.svg" alt="Add Vehicle" className="feature-icon-vehicle" />
                  </section>
                  <section className='main1-first13'>
                    <text>Specify your vehicle details to guarantee fit.</text>
                  </section>
                  <section className='main1-first14'>
                    <a href="#">Add Vehicle</a>
                  </section>
                </div>
              </div>
              <div className="product-pricing">
                <div className="product-actions">
                  <div className='div-text-addcart'>
                    <text>{product.price} <span>{product.originalPrice}</span></text>
                  </div>
                  <div className='add-to-cart1'>
                    <button className="add-to-cart">Add to Cart</button>
                  </div>
                  <button className="view-details">View Details</button>
                </div>
              </div>
            </div>

          ))}
          </section> */}




            {/* Counter section */}
            {/* <section id='Main-counterpage'>
          <div className='Main-counterpage-1'>
            <text>
              Showing {products.length} products
            </text>
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </section> */}



          </div>



        </div>

        {/* Product crausal section */}

        <div className='Product-crausal-sec1'>

          <Productcrausallink />


        </div>

        {/* Guide Section */}
        <section className="guide-section">
          <div className="guide-wrapper">
            <div className="guide-main-col">
              <div className="guide-column">
                <div className="guide-item">
                  <div className="guide-content">
                    <div className="guide-title">Help Guide</div>
                    <div className="guide-info">
                      <div className="guide-desc">
                        Get help with any questions or concerns by speaking with an expert.
                      </div>
                      <a href="/#">
                        <div className="guide-button">
                          <button className="btn-guide">GET HELP</button>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-column">
                <div className="guide-item align-center">
                  <div className="guide-title">
                    <span role="img" aria-label="mail" className="guide-icon">
                      <img src="/Home Images/Envelop.svg" alt="mail icon" className="guide-icon-img" />
                    </span>
                  </div>
                  <div className="guide-info">
                    <div className="guide-desc align-center">
                      <span>Support Hours Mon-Sun: 24/7</span>
                    </div>
                    <a href="/#">
                      <div className="chat-button">
                        <button className="btn-chat">CHAT WITH US</button>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* end */}

      </div>

      <Footer />

    </>
  );
};

export default SearchPage;
