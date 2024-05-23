import React, {useState} from 'react'
import { API_Path } from '../../data/ApiPath'

const AddProduct = () => {
  const [productName,setProductName]=useState("")
  const [price, setPrice]=useState("")
  const [category,setCategory]=useState([])
  const [bestSeller, setBestSeller]=useState()
  const [image,setImage]=useState(null)
  const [description,setDescription]=useState("")

  const handleCategoryChange=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item!== value));
    }else{
      setCategory([...category,value])
    }
  }  
  const handleBestSeller=(e)=>{
    const value=e.target.value==='true'
    setBestSeller(value)
  }
  const handleImageUpload=(e)=>{
    const selectedImage=e.target.files[0];
    setImage(selectedImage)
  }
  const handleAddProduct=async(e)=>{
    e.preventDefault()
    try {
      const loginToken= localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId')
      if(!loginToken || !firmId){
        console.error("user not authenticated")
      }
      const formData=new FormData();
    formData.append('productName',productName);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('image',image);
    formData.append('bestSeller',bestSeller);
    category.forEach((value)=>{
      formData.append('category',value)
    })

    const response= await fetch(`${API_Path}/product/add-product/${firmId}`,{
      method:'POST',
      body: formData
    })
    const data=await response.json()
    if(response.ok){
      console.log("Product added succesfully")
      alert('Product added succesfully')
      setProductName("")
      setPrice("");
      setCategory([])
      setBestSeller();
      setImage(null);
      setDescription("")
    }
    } catch (error) {
      console.error("Product failed to add",error)
      alert("Product failed to add")
    }
  }
  return (
    <div className="productSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <label>Product Name</label>
        <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}/><br />
        <label>Price</label>
        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/><br />
        {/* <label>Category</label>
        <input type="text"/><br /> */}
         <div className="checkInp">
          <label>Category</label>
          <div className="inputContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input type="checkbox" checked={category.includes('Veg')} value="Veg" onChange={handleCategoryChange}/>
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={category.includes('Non-Veg')} value="Non-Veg" onChange={handleCategoryChange}/>
            </div>
          </div>
        </div>

        {/* <label>Bestseller</label>
        <input type="text"/><br /> */}
         <div className="checkInp">
          <label>Bestseller</label>
          <div className="inputContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input type="radio" checked={bestSeller===true} value="true" onChange={handleBestSeller}/>
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input type="radio" checked={bestSeller===false} value="false" onChange={handleBestSeller}/>
            </div>
          </div>
        </div>

        <label>Description</label>
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/><br />
        <label>Product Image</label>
        <input type="file" onChange={handleImageUpload}/><br />
        <div className="btnSubmit">
            <button type="submit">Submit</button>
        </div>
    </form>
    </div>
  )
}

export default AddProduct
