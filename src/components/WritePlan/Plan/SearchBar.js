import React from "react";
import SearchBox from "./SearchBox";

const SearchBar =(props)=>{
   
    return(
        <div style={{maxWidth:"312px", width:"100%", margin:"0px auto"}}>  
           <SearchBox
           addPlace={props.addPlace}
           map={props.map}
           mapApi={props.mapApi}/>
        </div>
    )
}

export default SearchBar