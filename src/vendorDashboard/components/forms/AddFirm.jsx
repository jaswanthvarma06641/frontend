import React,{useState} from 'react'
import { API_Path } from '../../data/ApiPath';

const AddFirm = () => {
  const [firmName, setFirmName]=useState("");
  const [area, setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);

const handleCategoryChange=(e)=>{
  const value=e.target.value;
  if(category.includes(value)){
    setCategory(category.filter((item)=> item!== value));
  }else{
    setCategory([...category,value])
  }
}
const handleRegionChange=(e)=>{
  const value=e.target.value;
  if(region.includes(value)){
    setRegion(region.filter((item)=> item!== value));
  }else{
    setRegion([...region,value])
  }
}
const handleImageUpload=(e)=>{
  const selectedImage=e.target.files[0];
  setFile(selectedImage)
}
const handleFirmSubmit=async (e)=>{
  e.preventDefault();
  try {
    const loginToken= localStorage.getItem('loginToken');
    if(!loginToken){
      console.error("User not authenticated")
    }
    const formData=new FormData();
    formData.append('firmName',firmName);
    formData.append('area',area);
    formData.append('offer',offer);
    formData.append('image',file);
    category.forEach((value)=>{
      formData.append('category',value)
    })
    region.forEach((value)=>{
      formData.append('region',value)
    })
    const response =await fetch(`${API_Path}/firm/add-firm`,{
      method:'POST',
      headers:{
        'token':`${loginToken}`
      },
      body:formData
    });
    const data=await response.json()
    if(response.ok){
      console.log(data)
      alert("Firm Added Success")
      setFirmName("")
      setArea("")
      setCategory([])
      setRegion([])
      setOffer("")
      setFile(null)
      const firmId=data.firmId
      localStorage.setItem('firmId',firmId)
      localStorage.setItem('firmName',firmName)
    }else if(data.message==="Vendor can hold only one Firm"){
      alert("Only one Firm allowed for one Vendor")
    }else{
      alert('Failed to add Firm')
    }
  } catch (error) {
    console.error("Firm fail to add",error)
    alert("Firm fail to add")
  }
}

  return (
   <div className="firmSection">
    <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h2>Add Firm</h2>
        <label>Firm Name</label>
        <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/><br />
        <label>Area</label>
        <input type="text"name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br />
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

        <div className="checkInp">
          <label>Region</label>
          <div className="inputContainer">
            <div className="checkboxContainerr">
              <label>South Indian</label>
              <input type="checkbox" checked={region.includes('South-Indian')} value="South-Indian" onChange={handleRegionChange}/>
            </div>
            <div className="checkboxContainerr">
              <label>North Indian</label>
              <input type="checkbox" checked={region.includes('North-Indian')} value="North-Indian" onChange={handleRegionChange}/>
            </div>
            <div className="checkboxContainerr">
              <label>Chinese</label>
              <input type="checkbox" checked={region.includes('Chinese')} value="Chinese" onChange={handleRegionChange}/>
            </div>
            <div className="checkboxContainerr">
              <label>Bakery</label>
              <input type="checkbox" checked={region.includes('Bakery')} value="Bakery" onChange={handleRegionChange}/>
            </div>
          </div>
        </div>

{/*         
        <label>Region</label>
        <input type="text"/><br /> */}
        <label>Offer</label>
        <input type="text" name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)}/><br />
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload}/><br />
        <div className="btnSubmit">
            <button type="submit">Submit</button>
        </div>
    </form>
   </div>
  )
}

export default AddFirm
