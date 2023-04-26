import "./dashbord.css";
import logo from "../src/images/logo.png";
import trashcan from "../src/images/trashcan.png";
import editbutton from "../src/images/editbutton.png";
import Addbutton from "../src/images/Addbutton.png";
import { useState } from "react";
import Collapsible from "react-collapsible";
import axios from "axios";
import { useEffect } from "react";

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

  const [size, setSize] = useState([]);
  const [sizearray, setsizearray] = useState([]);

  const [color, setColor] = useState([]);
  const [colorarray, setColorarray] = useState([]);

  const [Description, setDescription] = useState("");
  const [pimage, setPimage] = useState("");
  const [pimage2, setPimage2] = useState("");
  const [pimage3, setPimage3] = useState("");
  const [threeimages, setthreeimages] = useState([]);

  useEffect(() => {
    getCategories();
  }, [
    Description,
    pimage,
    color,
    colorarray,
    size,
    sizearray,
    category_id,
    threeimages,
  ]);

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

  const getCategories = async () => {
    const response = await axios.get(
      `http://localhost:3030/cat/category/summer`
    );
    const categories = response.data.map((category) => ({
      id: category._id,
      name: category.name,
    }));
    setcategories(categories);
  };

  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  function handlePimage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgData = reader.result;
      setthreeimages([...images, imgData]);
    };
  }

  const addCategory = async () => {
    const formData = new FormData();
    formData.append("name", catname);
    formData.append("season", season);
    formData.append("sale", sale);
    formData.append("image", image);

    await axios.post("http://localhost:3030/cat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(formData);
  };

  const handleSale = (e) => {
    setNewsale(e.target.value);
  };

  const putCategory = async () => {
    // e.preventDefault();

    // const formData = new FormData();
    // formData.append("name", Newcatname);
    // formData.append("season", Newseason);
    // formData.append("sale", Newsale);
    // formData.append("image", Newimage);

    const data = { sale: Newsale};

    await axios
      .put(`http://localhost:3030/cat/6448eb53b3b6faae4b44385d`, data, {
        headers: {
          "Content-Type": "multipart/x-www-form-urlencoded",
        },
      })
      
        console.log(data);
      
    }
      
    

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("Description", Description);
    formData.append("image", threeimages);
    formData.append("category", category_id);

    await axios.post("http://localhost:3030/product/product", formData);

    console.log("success product amira");
  };

  const handlesize = (event) => {
    const sizes = event.target.value.split(",");
    setSize(sizes);
    setsizearray([...sizearray, ...sizes]);
  };

  const handlecolor = (event) => {
    const colors = event.target.value.split(",");
    setColor(colors);
    setColorarray([...colorarray, ...colors]);
  };

  const OpenAddProducts = () => {
    document.getElementById("addproductform").style.display = "block";
  };

  const CloseAddProducts = () => {
    document.getElementById("addproductform").style.display = "none";
  };

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
      <div className="navbar-container">
        <div>
          <img className="logoimg" src={logo} alt="" />
        </div>
        <div>
          <a href="/Home ">
            <p className="nav-buttons">Winter Categories</p>
          </a>
        </div>
        <div>
          <a href="/Order ">
            <p className="nav-buttons">Orders</p>
          </a>
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
                    <button className="add-sal" onClick={putCategory}>
                      Add
                    </button>
                  </div>

                  <button className="del-btn">
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
                        <button
                          className="background-none"
                          onClick={() => OpenAddProducts()}
                        >
                          <img src={editbutton} alt="" />
                        </button>
                        <button className="background-none">
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

        <label for="name">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter category name"
          value={catname}
          onChange={(e) => setCatname(e.target.value)}
          required
        />
        <br />

        <label for="psw">
          <b>Season</b>
        </label>
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />
        <br />

        <label className="textform">Sale</label>
        <br />
        <input
          type="text"
          value={sale}
          onChange={(e) => setSale(e.target.value)}
        />
        <br />
        <div>
          <label htmlFor="images">Choose Images:</label>
          <br />
          <input type="file" name="file" onChange={handleImage} />
          <br />
        </div>

        <button type="submit" className="btn" onClick={addCategory}>
          Submit
        </button>
        <button
          type="button"
          className="btn cancel"
          onClick={() => CloseAddCategory()}
        >
          Close
        </button>
      </div>

      <div className="form-popup" id="addproductform">
        <h1>Add Products </h1>

        <label for="text">
          <b>Title</b>
        </label>
        <input
          type="text"
          placeholder="Enter the product name"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label for="psw">
          <b>Price</b>
        </label>
        <input
          type="text"
          placeholder="Enter price"
          name="psw"
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <label className="textform">size</label>
        <br />
        <input type="text" value={size} onChange={handlesize} />
        <br />

        <label className="textform">color</label>
        <br />
        <input type="text" value={color} onChange={handlecolor} />
        <br />

        <label className="textform">Description</label>
        <br />
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <br />

        <div>
          <label htmlFor="images">Choose Images:</label>
          <br />
          <input type="file" id="images" name="file" onChange={handlePimage} />
          <br />
        </div>

        <button
          type="submit"
          className="btn"
          onClick={() => {
            addProduct();
            CloseAddProducts();
          }}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn cancel"
          onClick={() => {
            CloseAddProducts();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
