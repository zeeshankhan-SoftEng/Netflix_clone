import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviesSuggestions from './GptMoviesSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearchPage = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="h-fit object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMoviesSuggestions />
      </div>
    </>
  )
}

export default GptSearchPage
