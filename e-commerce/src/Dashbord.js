import "./dashbord.css"
import logo from "../src/images/logo.png"
import trashcan from "../src/images/trashcan.png"
import editbutton from "../src/images/editbutton.png"
import Addbutton from "../src/images/Addbutton.png"
import { useState } from 'react';
import Collapsible from 'react-collapsible';
import axios from "axios"
import { useEffect } from "react"

function Dashboard() {


    const [categories, setcategories] = useState(null)
    const [Products, setProducts] = useState(null)
    const [catname, setCatname] = useState('')
    const [season, setSeason]= useState("summer")
    const [sale, setSale]= useState(0)
    const [image, setImage] =useState('')

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {

        getCategories()

    }, []);

    const getProducts = async (cat_id) => {
        const response = await axios.get(`http://localhost:3030/product/productbyCategory/${cat_id}`);
        const products = response.data.map((product) => ({ title: product.title, id: product._id }));
        console.log(products);
        setProducts(products);
    }





    const getCategories = async () => {
        const response = await axios.get(`http://localhost:3030/cat`);
        const categories = response.data.map((category) => ({
            id: category._id,
            name: category.name,
        }));
        setcategories(categories)
    }


     
    function handleImage(e){
        console.log(e.target.files)
        setImage(e.target.files[0])
    }


    const addCategory = async () => {
          const formData= new FormData()
          formData.append('name', catname)
          formData.append('season', season)
          formData.append('sale', sale)
          formData.append('image', image)
          

      await  axios.post("http://localhost:3030/cat", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
    
            console.log(formData);
    } 
        
    



    const handleitemtags = (event) => {
        setitemtags([...itemtags, event.target.value]);
    }
    const [itemtags, setitemtags] = useState([])
    // const dummyData = [
    //     {
    //         id: 1,
    //         title: 'First Collapsible Item',
    //         content: 'Product 1 ',
    //     },
    //     {
    //         id: 2,
    //         title: 'Second Collapsible Item',
    //         content: 'This is the second collapsible item content.',
    //     },
    //     {
    //         id: 3,
    //         title: 'Third Collapsible Item',
    //         content: 'This is the third collapsible item content.',

    //     },
    // ];



    const OpenAddProducts = () => {
        document.getElementById("addproductform").style.display = "block";
    }


    const CloseAddProducts = () => {
        document.getElementById("addproductform").style.display = "none";
    }



    const OpenAddCategory = () => {
        document.getElementById("addcategoryform").style.display = "block";
    }


    const CloseAddCategory = () => {
        document.getElementById("addcategoryform").style.display = "none";
    }







    const [openIndex, setOpenIndex] = useState(-1);

    const handleTriggerClick = index => {
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
            <div className='navbar-container'>
                <div>
                    <img className='logoimg' src={logo} alt="" />
                </div>
            </div>
  
            <div className='headers'>
                <div className='parent-headder'>
                    <div className='summer-border'>
                        <p className='summer-parag'> Summer categories</p>
                    </div>

                    <div className='firstdiv'>
                        <div className="makesaleby">
                            <div className='makesaleby-firstinside'>
                                <p>
                                    Make Sale by :
                                </p>
                                <input className='input-sale' type="text" placeholder='100%' />
                            </div>
                            <div className='submit-sale'>
                                <button className='submit-salebutton'>Submit</button>
                            </div>
                        </div>
                        <div>
                            Sale ON
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='newcategory'>
                    <p> Add New  Category</p>
                    <button className="addbutton" onClick={() => { OpenAddCategory() }}>
                        <img src={Addbutton} alt="" />
                    </button>
                </div>
            </div>

            <div className='main-body-container'>
                <div className='collaps'>
                    {categories && categories.map((item, index) => (
                        <Collapsible
                            className='collaps-title'
                            trigger={item.name}
                            key={item.id}
                            open={index === openIndex}
                            onOpening={() => { getProducts(item.id); setOpenIndex(index) }}
                            onClosing={() => setOpenIndex(-1)}
                        >
                            <div className='flex-row' >
                                <p>add products </p>
                                <button onClick={() => { OpenAddProducts() }} className='background-none'> <img className='img-adding-button-contet' src={Addbutton} alt="" />





















                                </button>





                            </div>


                            {Products && Products.map((product) => (
                                <div className='content-dashboard' key={product.id}>
                                    <p className='parag-dash-content'>{product.title}</p>
                                    <div className='flex-content-end'>
                                        <button className='background-none' onClick={() => OpenAddProducts()}>
                                            <img src={editbutton} alt='' />
                                        </button>
                                        <button className='background-none'>
                                            <img src={trashcan} alt='' />
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
                <input type="text" placeholder="Enter category name" value={catname} onChange={e =>setCatname(e.target.value)} required />
                <br />

                <label for="psw"><b>Season</b></label>
                <input type="text"  value={season}  onChange={e =>setSeason(e.target.value)} />
                <br />



                <label className="textform" >Sale</label><br />
                <input type="text" value={sale} onChange={e =>setSale(e.target.value)} />
                <br />
                <div>
                    <label htmlFor="images">Choose Images:</label><br />
                    <input type="file"  name="file" onChange={handleImage} /><br />

                </div>







                <button type="submit" className="btn" onClick={addCategory}>Submit</button>
                <button type="button" className="btn cancel" onClick={() => CloseAddCategory()}>Close</button>

            </div>













            <div className="form-popup" id="addproductform">

                <h1>Add Products </h1>

                <label for="email"><b>Title</b></label>
                <input type="text" placeholder="Enter Email" name="email" required />
                <br />

                <label for="psw"><b>Price</b></label>
                <input type="text" placeholder="Enter Password" name="psw" required />
                <br />



                <label className="textform" >size</label><br />
                <input type="text" value={itemtags} onChange={handleitemtags} />
                <br />

                <label className="textform" >color</label><br />
                <input type="text" value={itemtags} onChange={handleitemtags} />
                <br />

                <div>
                    <label htmlFor="images">Choose Images:</label><br />
                    <input type="file" id="images" name="images" /><br />

                </div>






                <button type="submit" className="btn">Submit</button>
                <button type="button" className="btn cancel" onClick={() => CloseAddProducts()}>Close</button>

            </div>







        </div>
    );
}

export default Dashboard;


















































// import "./dashbord.css"
// import logo from "../src/images/logo.png"
// import trashcan from "../src/images/trashcan.png"
// import editbutton from "../src/images/editbutton.png"
// import Addbutton from "../src/images/Addbutton.png"
// import { useState } from 'react';
// import Collapsible from 'react-collapsible';

// function Dashboard() {






//     const handleitemtags = (event) => {
//         setitemtags([...itemtags, event.target.value]);
//     }
//     const [itemtags, setitemtags] = useState([])
//     const dummyData = [
//         {
//             id: 1,
//             title: 'First Collapsible Item',
//             content: 'Product 1 ',
//         },
//         {
//             id: 2,
//             title: 'Second Collapsible Item',
//             content: 'This is the second collapsible item content.',
//         },
//         {
//             id: 3,
//             title: 'Third Collapsible Item',
//             content: 'This is the third collapsible item content.',

//         },
//     ];



//     const OpenAddProducts = () => {
//         document.getElementById("addproductform").style.display = "block";
//     }


//     const CloseAddProducts = () => {
//         document.getElementById("addproductform").style.display = "none";
//     }



//     const OpenAddCategory = () => {
//         document.getElementById("addcategoryform").style.display = "block";
//     }


//     const CloseAddCategory = () => {
//         document.getElementById("addcategoryform").style.display = "none";
//     }







//     const [openIndex, setOpenIndex] = useState(-1);

//     const handleTriggerClick = index => {
//         if (index === openIndex) {
//             setOpenIndex(-1); // Close the open one if clicked again
//         } else {
//             setOpenIndex(index); // Open the clicked one
//         }
//     };



//     const [images, setImages] = useState([]);

//     const handleImagesChange = (event) => {
//         const files = event.target.files;
//         const imagesArray = [];
//         for (let i = 0; i < files.length; i++) {
//             const file = files[i];
//             imagesArray.push(URL.createObjectURL(file));
//         }
//         setImages(imagesArray);
//     };


//     return (
//         <div>
//             <div className='navbar-container'>
//                 <div>
//                     <img className='logoimg' src={logo} alt="" />
//                 </div>
//             </div>

//             <div className='headers'>
//                 {/* <div className='parent-headder'>
//                     <div className='summer-border'>
//                         <p className='summer-parag'> Summer categories</p>
//                     </div>

//                     <div className='firstdiv'>
//                         <div className="makesaleby">
//                             <div className='makesaleby-firstinside'>
//                                 <p>
//                                     Make Sale by :
//                                 </p>
//                                 <input className='input-sale' type="text" placeholder='100%' />
//                             </div>
//                             <div className='submit-sale'>
//                                 <button className='submit-salebutton'>Submit</button>
//                             </div>
//                         </div>
//                         <div>
//                             Sale ON
//                             <label className="switch">
//                                 <input type="checkbox" />
//                                 <span className="slider round"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div> */}
//                 <div className='newcategory'>
//                     <p> Add New  Category</p>
//                     <button className="addbutton" onClick={() => { OpenAddCategory() }}>
//                         <img src={Addbutton} alt="" />
//                     </button>
//                 </div>
//             </div>

//             <div className='main-body-container'>
//                 <div className='collaps'>
//                     {dummyData.map((item, index) => (
//                         <Collapsible
//                             className='collaps-title'
//                             trigger={item.title}
//                             key={item.id}
//                             open={index === openIndex}
//                             onOpening={() => setOpenIndex(index)}
//                             onClosing={() => setOpenIndex(-1)}
//                         >
//                             <div className='flex-row' >
//                                 <p>add products </p>
//                                 <button onClick={() => { OpenAddProducts() }} className='background-none'> <img className='img-adding-button-contet' src={Addbutton} alt="" />





















//                                 </button>





//                             </div>

//                             <div className='content-dashboard'>





//                                 <p className='parag-dash-content'>{item.content}</p>








//                                 <div className='flex-content-end'>
//                                     <button className='background-none' onClick={() => OpenAddProducts()} ><img src={editbutton} alt="" /></button>
//                                     <button className='background-none' > <img src={trashcan} alt="" /></button>
//                                 </div>
//                             </div>

//                         </Collapsible>
//                     ))}
//                 </div>
//             </div>







//             <div className="form-popup" id="addcategoryform">

//                 <h1>Add Category </h1>

//                 <label for="text"><b>Name</b></label>
//                 <input type="text" placeholder="Enter category name" name="name" required />
//                 <br />

//                 <label for="text"><b>Season</b></label>
//                 <input type="text" />
//                 <br />



//                 <label className="textform" >Sale</label><br />
//                 <input type="text" />
//                 <br />







//                 <button type="submit" className="btn" onClick={}>Submit</button>
//                 <button type="button" className="btn cancel" onClick={() => CloseAddCategory()}>Close</button>

//             </div>













//             <div className="form-popup" id="addproductform">

//                 <h1>Add Products </h1>

//                 <label for="email"><b>Title</b></label>
//                 <input type="text" placeholder="Enter Email" name="email" required />
//                 <br />

//                 <label for="psw"><b>Price</b></label>
//                 <input type="text" placeholder="Enter Password" name="psw" required />
//                 <br />



//                 <label className="textform" >size</label><br />
//                 <input type="text" value={itemtags} onChange={handleitemtags} />
//                 <br />

//                 <label className="textform" >color</label><br />
//                 <input type="text" value={itemtags} onChange={handleitemtags} />
//                 <br />

//                 <div>
//                     <label htmlFor="images">Choose Images:</label><br />
//                     <input type="file" id="images" name="images" multiple onChange={handleImagesChange} /><br />

//                 </div>








//                 <button type="submit" className="btn">Submit</button>
//                 <button type="button" className="btn cancel" onClick={() => CloseAddProducts()}>Close</button>

//             </div>







//         </div>
//     );
// }

// export default Dashboard;
