import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function OiasisItems(props) {
    const [descriptionInput, setdescriptionInput] = useState(false)
    const [priceInput, setpriceInput] = useState(false)
    
    const [inputValue, setinputValue] = useState("");
    const [itemObject, setitemObject] = useState({})
    const [token, settoken] = useState('')

    useEffect(() => {
        settoken(props.token)
        setitemObject(props.imginfo)
        // setmyData(props.myData.metal)
    }, [])

 
    const editDescription=() =>{
        setdescriptionInput(!descriptionInput)
    }
   const setValue=(e)=> {
        setinputValue(e.target.value);
    }

    const updateItemDesc = (e) => {
        e.preventDefault();
        changeValue(inputValue);
    }

       const changeValue=(value)=> {
        let newItemObject = { ...itemObject }
        newItemObject.description = value;
        setitemObject(newItemObject);
        setdescriptionInput(false);
    }

    //////////////   edit price //////////////////////////////
    const editPrice=() =>{
        setpriceInput(!priceInput)
    }
    const updateItemPrice = (e) => {
        e.preventDefault();
        changePriceValue(inputValue);
    }

       const changePriceValue=(value)=> {
        let newItemObject = { ...itemObject }
        newItemObject.price = value;
        setitemObject(newItemObject);
        setpriceInput(false);
    }



    return (
       <div  style={{ borderRadius: "10px" }} className='col-md-3 my-2'>
                     <div style={{ borderRadius: "10px" }} className="photo_container bg-light p-2 w-100 h-100 ">
                    <img style={{ borderRadius: "5px", height: "150px" }} src={itemObject.img_url} className='w-100 ' alt="not found" />
                <div className='py-3'>
                    {/* input update */}
                <div>
                    {descriptionInput ? <form onSubmit={updateItemDesc} className='d-flex justify-content-around mx-1 mt-1'>
                        <input className=' form-control border-none ' onChange={setValue} type="text" defaultValue={itemObject.description} />
                        <button className='rounded-1 p-1 fw-bold bg-danger text-light border-0'> change </button>
                    </form> : ''}
                </div>
                        <h4 >{itemObject.name}</h4> {props.isAdmin ? <button onClick={editDescription} className='btn-secondary rounded-start rounded-end px-2'>Edit Description</button> : ''}
                        <p style={{ lineHeight: "18px", fontSize: "15px" }}>{itemObject.description}</p>
                </div>
                {/*  price //////////////////////////////////////////////////////////////////////////////////// */}
                <div>
                    {priceInput ? <form onSubmit={updateItemPrice} className='d-flex justify-content-around mx-1 mt-1'>
                        <input className=' form-control border-none ' onChange={setValue} type="text" defaultValue={itemObject.price} />
                        <button className='rounded-1 p-1 fw-bold bg-danger text-light border-0'> change </button>
                    </form> : ''}
                </div>
                {props.isAdmin ? <button onClick={editPrice} className='btn-secondary my-2 rounded-start rounded-end px-2'>Edit price</button> : ''}
                    <div className="d-flex justify-content-between px-2">
                        <span className='badge bg-success pt-2'>$ {itemObject.price} SR </span> 
                        {props.isAdmin ? <button onClick={() =>props.deleteItem(itemObject._id)} className='bg-danger text-white px-2 rounded-3 fw-light'>Delete</button>
                            : <i onClick={()=>props.addToCart(itemObject._id)} className="fas fa-cart-plus fs-4 text-danger"></i>}
                    </div>
                </div>
            </div>
    )
}
