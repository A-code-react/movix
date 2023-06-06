import React, { useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {
const [endpoint,setEndpoiunt]=useState('movie')
 const {data,loading}=useFetch(`/${endpoint}/top_rated`);
    const onTabChange = (tab) => {
        setEndpoiunt(tab==="Movies"?"movie":"tv")
    }
  return (

    <div className="carouselSection">
        <ContentWrapper>
             <span className="carouselTitle"> What's Popular </span>
             <SwitchTabs data={["Movies","TV shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
<Carousel data={data?.results} loading={loading}/>
    </div>
    )
}

export default Popular