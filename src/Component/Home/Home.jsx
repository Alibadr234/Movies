import React, { useEffect } from 'react'
import axios from 'axios'
import SliderTopM from '../SliderTopM/SliderTopM'
import Slidertwo from '../Slidertwo/Slidertwo'
import Sliderthree from '../Sliderthree/Sliderthree'
import Movieoption from '../Movieoption/Movieoption'
import Tvoption from '../Tvoption/Tvoption'
import Partenr from '../Partenr/Partenr'
export default function Home() {
  const apikay ="45d1e37abba3da0419528c6d2999dc63"
  async function getMovie() {
    const data = await axios.get(`
https://api.themoviedb.org/3/discover/movie?api_key=${apikay}` ) }
useEffect(()=>{
  getMovie()
},[])
  return (
    <>
<div class="home">
    <div class="caption">
        <div class="desc">
            <h2>Experience the Magic of Cinema</h2>
            <p>
                Enjoy unlimited streaming, the latest blockbusters, and timeless classics.  
                Dive into a world of entertainment like never before!
            </p>
            <a href="#" class="btn">Start Watching</a>
            <div class="scroll-down"></div>
        </div>
    </div>
</div>

<div>
    <SliderTopM/>
    <Movieoption/>
    <Slidertwo/>
    <Sliderthree/>
    <Tvoption/>
    <Partenr/>
</div>


          </>
  )
}
