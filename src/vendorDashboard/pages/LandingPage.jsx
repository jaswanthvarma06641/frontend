import React,{useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin]=useState(false)
  const [showRegister, setShowRegister]=useState(false)
  const [showFirm, setShowFirm]=useState(false)
  const [showProduct, setShowProduct]=useState(false)
  const [showWelcome, setShowWelcome]=useState(false)
  const [showAllProduct, setShowAllProduct]=useState(false)
  const [showLogout, setShowLogout]=useState(false)
  const [showFirmTitle, setShowFirmTitle]=useState(true)

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken')
    if(loginToken){
      setShowLogout(true)
    }
  },[])
  useEffect(()=>{
    const firmname=localStorage.getItem('firmName')
    if(firmname){
      setShowFirmTitle(false)
    }
  },[])
const LogOutHandler=()=>{
  confirm("Are you sure to logout?")
  localStorage.removeItem('loginToken')
  localStorage.removeItem('firmId')
  localStorage.removeItem('firmName')
  setShowLogout(false)
  setShowFirmTitle(true)
}

const showLoginHandler=()=>{
  setShowLogin(true)
  setShowRegister(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(false)
  setShowAllProduct(false)
}
const showRegisterHandler=()=>{
  setShowRegister(true)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(false)
  setShowAllProduct(false)
}
const ShowFirmHandler=()=>{
  if(showLogout){
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(true)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProduct(false)
  }else{
    alert("please login")
    setShowLogin(true)
  }
}
const ShowProductHandler=()=>{
  if(showLogout){
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(true)
  setShowWelcome(false)
  setShowAllProduct(false)}
  else{
    alert("please login")
    setShowLogin(true)
  }
}
const ShowWelcomeHandler=()=>{
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(true)
  setShowAllProduct(false)
}
const ShowAllProductHandler=()=>{
  if(showLogout){
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(false)
  setShowAllProduct(true)}
  else{
    alert("please login")
    setShowLogin(true)
  }
}


  return (
    <div>
      <>
      <section className='landingSection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} LogOutHandler={LogOutHandler}/>
        <div className="collectionSection">
          <SideBar showFirmHandler={ShowFirmHandler} showProductHandler={ShowProductHandler} showAllProductHandler={ShowAllProductHandler} showFirmTitle={showFirmTitle}/>
          {showLogin && <Login ShowWelcomeHandler={ShowWelcomeHandler}/>}
          {showRegister && <Register showLoginHandler={showLoginHandler}/>}
          {showFirm && showLogout && <AddFirm/>}
          {showProduct && showLogout && <AddProduct/>}
          {showWelcome && showLogout && <Welcome/>}
          {showAllProduct && showLogout && <AllProducts/>}
        </div>
      </section>
      </>
    </div>
  )
}

export default LandingPage
