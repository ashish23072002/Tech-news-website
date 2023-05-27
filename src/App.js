import React from 'react'
import Search from './Search'
import Pagination from './Pagination'
import Stories from './Stories'
import "./App.css";
// import {useContext} from 'react'
// import {AppContext} from "./contex"



const App = () => {
  // const data = useContext(AppContext);---- we have mader this as a cutom hoook named useGlobalContext
  return (
    <div>
   <Search/>
      <Pagination/>
      <Stories/>
    </div>
  )
}

export default App
