import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const [search, setSearchData]=useState([])
    const params = useParams()
    const category=params.csategory
    console.log(category);

    const getFilterData = async ()=>{
        try{
            const res=await axios.get('https://fakestoreapi.com/products/category?type=${category}')
            const data = res.data.products
            setSearchData(data)

        }catch (error){
            console.log
        }
    }

    useEffect(()=>{
        getFilterData()
    },[]);

  return (
    <div>
        {
        searchData.length > 0 ? ()(
            <div></div>
        ):(
            <div className='flex items-center justify-center h-[400px]'>

            </div>
        )
        }
    </div>
  )
}
export default CategoryProduct
