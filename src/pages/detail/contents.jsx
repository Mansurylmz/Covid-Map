import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentLoader from '../../components/loader/contentLoader'
import Error from '../../components/error'
import Card from './card'
import { useParams } from 'react-router-dom'
import { getDetails } from '../../redux/action'

const Content = () => {

    const dispatch=useDispatch()
    const {country}=useParams()

    

    const {isLoading,error,data}=useSelector((store)=>store)

    const arr=Object.entries(data || {}).filter(([key])=>key!=="flag")
    console.log(arr)
  return (
    <div className='mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6'>{isLoading ? <ContentLoader/> : error ? <Error info={error} refetch={()=>getDetails(country)} /> :(arr.map((item,key)=><Card key={key} item={item} />))}
    
    </div>
  )
}

export default Content