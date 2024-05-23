import React,{useState, useEffect} from 'react'
import { API_Path } from '../data/ApiPath';

const AllProducts = () => {
    const [products, setProducts]= useState([]);
    const productHandler =async()=>{
        // e.preventDefault()
        const firmId=localStorage.getItem('firmId')
        try {
            const response=await fetch(`${API_Path}/product/${firmId}/products`);
            const newProductData=await response.json()
            setProducts(newProductData.products)
        } catch (error) {
            console.error("Failed to show all Products",error)
            alert("Failed to show all Products")
        }
    }
    useEffect(()=>{
        productHandler()
    }, [])
    const deleteProductById=async(productId)=>{
        try {
            const response=await fetch(`${API_Path}/product/${productId}`,{
                method:'DELETE'
            })
            if(response.ok){
                setProducts(products.filter(product=>product._id!==productId))
                confirm("are you sure, u want to delete?")
                alert("Product deleted succesfully")
            }
        } catch (error) {
            console.error('Failed to delete Product',error)
            alert('failed to delete Product')
        }
    }
  return (
    <div>
      {products.length===0?(
        <p>No products added</p>
      ): (
        <table className='product-table'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Product Image</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>
                    {return <>
                    <tr key={item._id}>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.image && (
                            <img src={`${API_Path}/uploads/${item.image}`} alt={item.productName}
                            style={{width: '50px', height:'50px'}}
                            />
                        )}</td>
                        <td>
                            <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                        </td>
                    </tr>
                    </>
                })}
            </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts
