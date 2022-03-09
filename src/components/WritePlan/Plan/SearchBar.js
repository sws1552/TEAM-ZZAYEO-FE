import React from "react";
import SearchBox from "./SearchBox";

const SearchBar =(props)=>{
   
    return(
        <div>  
           <SearchBox
           addPlace={props.addPlace}
           map={props.map}
           mapApi={props.mapApi}/>
        </div>
    )
}

export default SearchBar