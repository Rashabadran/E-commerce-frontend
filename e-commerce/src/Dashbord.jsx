import "./dashbord.css";
import logo from "../src/images/logo.png";
import trashcan from "../src/images/trashcan.png";
import editbutton from "../src/images/editbutton.png";
import Addbutton from "../src/images/Addbutton.png";
import { useState } from "react";
import Collapsible from "react-collapsible";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [category_id, setcategory_id] = useState(null);
  const [categories, setcategories] = useState(null);
  const [Products, setProducts] = useState(null);
  const [catname, setCatname] = useState("");
  const [season, setSeason] = useState("summer");
  const [sale, setSale] = useState(0);
  const [image, setImage] = useState("");
  const [Newcatname, setNewcatname] = useState("");
  const [Newseason, setNewseason] = useState("summer");
  const [Newimage, setNewimage] = useState("");
  const [Newsale, setNewsale] = useState(0);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");


  const [Products_id, setProducts_id] = useState(null)

  const [edittitle, setedittitle] = useState('')
  const [editprice, seteditPrice] = useState('')
  const [size, setsize] = useState([])
  const [sizeedit, setsizeedit] = useState([])
  const [editcolor, seteditColor] = useState([])
  const [editDescription, seteditDescription] = useState('')
  const [color, setColor] = useState([])
  const [Description, setDescription] = useState('')
  const [pimage, setPimage] = useState('')
  const [threeimages, setthreeimages] = useState([]);


  const [productsdata, setproductsdata] = useState()






  const navigate = useNavigate();
  // check if the user have the admin as a role 


  function checkUserRole() {
    const userRole = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token');


    // Get the user's role from session storage
    if (!token || userRole === 'user') {
      // User has the 'user' role, so navigate to the desired page

      navigate("/", { replace: true });
    }
  }






  // make the session clearrrrrr




  function resetSession() {
    sessionStorage.clear(); // Clear the session storage
  }

  let sessionTimeout; // Variable to store the session timeout ID

  function startSessionTimer() {
    sessionTimeout = setTimeout(resetSession, 10 * 60 * 1000); // Set a timeout of 1 minute (1 * 60 * 1000 milliseconds)
  }

  function resetSessionTimer() {
    clearTimeout(sessionTimeout); // Clear the session timeout
    startSessionTimer(); // Start the session timer again
  }



  startSessionTimer();

























  useEffect(() => {

    getCategories()
    checkUserRole()

  }, [categories, Description, pimage, color, category_id, threeimages, Products_id, title, price, color, Description, edittitle, editprice, editDescription, productsdata]);

  const getProducts = async (cat_id) => {
    const response = await axios.get(
      `http://localhost:3030/product/productbyCategory/${cat_id}`
    );
    const products = response.data.map((product) => ({
      title: product.title,
      id: product._id,
    }));
    console.log(products);
    setProducts(products);
  };


  // deleeeeeeeettttttteeeeeeee prooooducts 



  const deleteproduct = async (id) => {
    startSessionTimer();
    const response = await axios.delete(`http://localhost:3030/product/deleteProduct/${id}`)
    console.log("the product is deleted ")



    toast.success('deleted  successfully!', { position: toast.POSITION.TOP_RIGHT });







    // fawazzzzzzzzzzzzzzzz make the toastifyyyyy for deletion  
  }




  const getproductsbyid = async (id) => {
    startSessionTimer();
    const response = await axios.get(`http://localhost:3030/product//productbyID/${id}`)
    setproductsdata(response.data)
    console.log(response.data)
    setedittitle(response.data.title)
    seteditColor(response.data.color)
    setsizeedit(response.data.size)
    seteditDescription(response.data.Description)
    seteditPrice(response.data.price)





  }


  const getCategories = async () => {
    const response = await axios.get(`http://localhost:3030/cat/category/summer`);
    const categories = response.data.map((category) => ({
      id: category._id,
      name: category.name,
    }));
    setcategories(categories)
  }



  function handleImage(e) {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }


  const handlePimage = (e) => {
    const files = Array.from(e.target.files);
    const reader = new FileReader();

    files.forEach((file) => {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imgData = reader.result;
        setthreeimages((prevImages) => [...prevImages, imgData]);

      };
    });
  };


  const addCategory = async () => {
    startSessionTimer();
    const formData = new FormData()
    formData.append('name', catname)
    formData.append('season', season)
    formData.append('sale', sale)
    formData.append('image', image)


    await axios.post("http://localhost:3030/cat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(formData);
    toast.success('Added category  successfully!', { position: toast.POSITION.TOP_RIGHT });
  }



  const deletecategory = async (id) => {
    startSessionTimer();
    const response = await axios.delete(`http://localhost:3030/cat/${id}`)
    console.log(response.data)


    console.log("the category is deleted ")
    toast.success('category deleted  successfully!', { position: toast.POSITION.TOP_RIGHT });
  }




  const handleSale = (e) => {
    setNewsale(e.target.value);
  };





  const handlesize = (event) => {
    setsize(event.target.value.split(","));
    console.log(event.target.value.split(","))

  }

  const handleeditsize = (event) => {
    setsizeedit(event.target.value.split(","));
    console.log(event.target.value.split(","))

  }


  const handleeditcolor = (event) => {
    seteditColor(event.target.value.split(","));
    console.log(event.target.value.split(","))
  };
  const handlecolor = (event) => {
    setColor(event.target.value.split(","));
    console.log(event.target.value.split(","))
  };


  const addProduct = async () => {
    startSessionTimer();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("Description", Description);
    formData.append("image", threeimages);
    formData.append("category", category_id);
    for (let i = 0; i < size.length; i++) {
      formData.append("size[]", size[i]);
    }
    for (let i = 0; i < color.length; i++) {
      formData.append("color[]", color[i]);
    }

    await axios.post("http://localhost:3030/product/product", formData);

    console.log(threeimages);
    console.log("success product amira");
    toast.success('Product added successfully!', { position: toast.POSITION.TOP_RIGHT });
  };




  const editProduct = async () => {
    startSessionTimer();
    const editdata = {
      title: edittitle,
      price: editprice,
      size: [],
      color: [],
      Description: editDescription
    };

    for (let i = 0; i < sizeedit.length; i++) {
      editdata.size.push(sizeedit[i]);
    }

    for (let i = 0; i < editcolor.length; i++) {
      editdata.color.push(editcolor[i]);
    }

    const response = await axios.put(`http://localhost:3030/product/productUpdate/${Products_id}`, editdata);

    console.log("response", response);
    toast.success('Product updated  successfully!', { position: toast.POSITION.TOP_RIGHT });
    console.log("success the product is updated  product amira");
  };





  const OpenAddProducts = () => {
    document.getElementById("addproductform").style.display = "block";
  };


  const CloseAddProducts = () => {
    document.getElementById("addproductform").style.display = "none";
  };


  const OpenEditProducts = () => {
    document.getElementById("editproductform").style.display = "block";
  }


  const CloseEditProducts = () => {
    document.getElementById("editproductform").style.display = "none";
  }











  const OpenAddCategory = () => {
    document.getElementById("addcategoryform").style.display = "block";
  };

  const CloseAddCategory = () => {
    document.getElementById("addcategoryform").style.display = "none";
  };



  const [openIndex, setOpenIndex] = useState(-1);


  const handleTriggerClick = (index) => {
    if (index === openIndex) {
      setOpenIndex(-1); // Close the open one if clicked again
    } else {
      setOpenIndex(index); // Open the clicked one
    }
  };

  const [images, setImages] = useState([]);

  const handleImagesChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      imagesArray.push(URL.createObjectURL(file));
    }
    setImages(imagesArray);
  };

  return (
    <div>
      <ToastContainer />
      <div className="navbar-container">
        <div>
          <img className="logoimg" src={logo} alt="" />
        </div>



        <div>
          {/* winterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrcategoryyyyyyyyyyyyyyyyyyyyyyyy */}
          <Link to="/Winter">
            <p className="nav-buttons">Winter Categories</p>
          </Link>

        </div>



        <div>
          {/* summmmmer category  */}
          <Link to="/Dashboard">
            <p className="nav-buttons">Summer Categories</p>
          </Link>

        </div>
















        <div>

          <Link to="/Order ">
            <p className="nav-buttons">Orders</p>
          </Link>
        </div>



        {/* clear the session and go to the login  */}

        <div>

          <Link to="/" onClick={() => { sessionStorage.clear(); }}>
            <p className="nav-buttons">Sign out</p>
          </Link>

        </div>




      </div>

      <div className="headers">
        <div className="parent-headder">
          <div className="summer-border">
            <p className="summer-parag"> Summer Categories</p>
          </div>
        </div>
        <br></br>
        <div className="newcategory">
          <p> Add New Category</p>
          <button
            className="addbutton"
            onClick={() => {
              OpenAddCategory();
            }}
          >
            <img src={Addbutton} alt="" />
          </button>
        </div>
      </div>

      <div className="main-body-container">
        <div className="collaps">
          {categories &&
            categories.map((item, index) => (
              <Collapsible
                className="collaps-title"
                trigger={item.name}
                key={item.id}
                open={index === openIndex}
                onOpening={() => {
                  setcategory_id(item.id);
                  getProducts(item.id);
                  setOpenIndex(index);
                }}
                onClosing={() => setOpenIndex(-1)}
              >
                <div className="cat-parent">
                  <div>
                    <label>Sale :</label>
                    <input
                      type="text"
                      className="sale-btn"
                      name="sale"
                      value={item.sale}
                      onChange={handleSale}
                    ></input>
                    <button className="add-sal" >
                      Add
                    </button>
                  </div>




                  {/* deleteeeee categoriesss butttonnnnn */}
                  <button className="del-btn" onClick={() => { deletecategory(item.id) }}  >
                    <img src={trashcan} alt="" />
                  </button>
                </div>

                <div className="flex-row">
                  <p>add products </p>
                  <button
                    onClick={() => {
                      OpenAddProducts();
                    }}
                    className="background-none"
                  >
                    {" "}
                    <img
                      className="img-adding-button-contet"
                      src={Addbutton}
                      alt=""
                    />
                  </button>
                </div>

                {Products &&
                  Products.map((product) => (
                    <div className="content-dashboard" key={product.id}>
                      <p className="parag-dash-content">{product.title}</p>
                      <div className="flex-content-end">
                        <button className="background-none"
                          onClick={() => { getproductsbyid(product.id); console.log(product.id); setProducts_id(product.id); OpenEditProducts() }}
                        >
                          <img src={editbutton} alt="" />
                        </button>
                        <button className="background-none" onClick={() => { deleteproduct(product.id) }}>
                          <img src={trashcan} alt="" />
                        </button>
                      </div>
                    </div>
                  ))}
              </Collapsible>
            ))}
        </div>
      </div>

      <div className="form-popup" id="addcategoryform">

        <h1>Add Category </h1>

        <label for="name"><b>Name</b></label>
        <input type="text" placeholder="Enter category name" value={catname} onChange={e => setCatname(e.target.value)} required />
        <br />

        <label for="psw"><b>Season</b></label>
        <input type="text" value={season} onChange={e => setSeason(e.target.value)} />
        <br />



        <label className="textform" >Sale</label><br />
        <input type="text" value={sale} onChange={e => setSale(e.target.value)} />
        <br />
        <div>
          <label htmlFor="images">Choose Images:</label><br />
          <input type="file" name="file" onChange={handleImage} /><br />

        </div>







        <button type="submit" className="btn" onClick={addCategory}>Submit</button>
        <button type="button" className="btn cancel" onClick={() => CloseAddCategory()}>Close</button>

      </div>
















      <div className="form-popup" id="addproductform">

        <h1>Add Products </h1>

        <label for="text"><b>Title</b></label>
        <input type="text" placeholder="Enter the product name" name="title" required onChange={e => setTitle(e.target.value)} />
        <br />

        <label for="psw"><b>Price</b></label>
        <input type="text" placeholder="Enter price" name="psw" required onChange={e => setPrice(e.target.value)} />
        <br />



        <label className="textform" >size</label><br />
        <input type="text" value={size} onChange={handlesize} />
        <br />

        <label className="textform" >color</label><br />
        <input type="text" value={color} onChange={handlecolor} />
        <br />

        <label className="textform" >Description</label><br />
        <input type="text" onChange={e => setDescription(e.target.value)} />
        <br />


        <div>
          <label htmlFor="images">Choose Images:</label>
          <br />
          <input type="file" id="images" name="file" onChange={handlePimage} multiple />
          <br />
          {threeimages.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} />
          ))}
        </div>






        <button type="submit" className="btn" onClick={() => { addProduct(); CloseAddProducts() }}>Submit</button>
        <button type="button" className="btn cancel" onClick={() => { CloseAddProducts() }}>Close</button>

      </div>















      {/* edit product form  */}





      <div className="form-popup" id="editproductform">

        <h1>Edit  Products </h1>
        {/* {productsdata&&productsdata.map((item, index) => (
    <> */}
        <label for="text"><b>Title</b></label>
        <input type="text" placeholder={productsdata && productsdata.title} name="title" required onChange={(e) => { setedittitle(e.target.value) }} />
        <br />

        <label for="psw"><b>Price</b></label>
        <input type="text" placeholder={productsdata && productsdata.price} name="psw" required onChange={(e) => { seteditPrice(e.target.value) }} />
        <br />



        <label className="textform" >size</label><br />
        <input type="text" placeholder={productsdata && productsdata.size} onChange={handleeditsize} />
        <br />

        <label className="textform" >color</label><br />
        <input type="text" placeholder={productsdata && productsdata.color} onChange={handleeditcolor} />
        <br />

        <label className="textform" >Description</label><br />
        <input type="text" placeholder={productsdata && productsdata.Description} onChange={e => seteditDescription(e.target.value)} />
        <br />
        {/* </>
))} */}

        <button type="submit" className="btn" onClick={() => { editProduct(); CloseEditProducts() }}>Submit</button>
        <button type="button" className="btn cancel" onClick={() => { CloseEditProducts() }}>Close</button>

      </div>















    </div>
  );
}
export default Dashboard;
