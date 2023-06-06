import { useState,useEffect } from 'react'

import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/SearchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { all } from 'axios';

function App() {
  const dispatch = useDispatch();
  const {url}=useSelector((state)=>
  state.home);
  console.log(url)
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])
const fetchApiConfig=()=>{
fetchDataFromApi('/configuration')
  .then((res)=>{
    console.log(res);
    const url={
      backdrop:
      res.images.secure_base_url +'original',
       poster: res.images.secure_base_url +'original', 
      profile:res.images.secure_base_url +'original'
    };
    dispatch(getApiConfiguration(url))
  })
}

const genresCall=async()=>{
let promises=[];
let endPoints=["tv",'movie'];
let allGenres={};

endPoints.forEach((url)=>{
  promises.push(fetchDataFromApi(`/genre/${url}/list`))
})


const data=await Promise.all(promises);
console.log(data)
data.map(({genres})=>{
  return genres.map((item)=>(allGenres[item.id]=item))
})
dispatch(getGenres(allGenres))
// console.log(allGenres)
};


  return(

    <>
    <BrowserRouter>
    <Header/>
    <Routes>
<Route path='/' element={<Home/>} />
<Route path='/:mediaType/:id' element={<Details/>} />
<Route path='/search/:query' element={<SearchResult/>} />
<Route path='/explore/:mediaType' element={<Explore/>} />
<Route path='/*' element={<PageNotFound/>} />


    </Routes>
    
    <Footer/>
    </BrowserRouter>
    </>
//     <>
//      <div className='App'>
      
      
//         <Header/>
//         <Footer/>
// <Home/>
// <Details/>
// <SearchResult/>
// <Explore/>
// <PageNotFound/>
      
//       {url?.total_pages}
//       </div>
     
//     </>
  )
}

export default App


//Windows PowerShell
// Copyright (C) Microsoft Corporation. All rights reserved.

// Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

// PS D:\all react apps\Movix> npm create vite@latest
// Need to install the following packages:
//   create-vite@4.3.1
// Ok to proceed? (y) y
// √ Project name: ... .
// √ Package name: ... movix
// √ Select a framework: » React
// √ Select a variant: » JavaScript

// Scaffolding project in D:\all react apps\Movix...

// Done. Now run:

//   npm install
//   npm run dev

// PS D:\all react apps\Movix>