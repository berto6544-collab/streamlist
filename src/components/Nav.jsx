import React from 'react';

import { useSearchParams  } from 'react-router-dom';

const Nav = () =>{
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [search,setSearch] = React.useState(searchParams?.get('s'));

    return(
    <div className={'nav'}>
    <div className={'nav-left'}>
    <a href={'/'} style={{textDecoration:'none',color:'white',fontWeight:'bold'}}><h3>StreamList</h3></a>
    
    <a href={'/tvshows'} style={{color:'white'}}>TV Shows</a>
    <a href={'/movies'} style={{color:'white'}}>Movies</a>
    <a>New & popular</a>

    </div>
    <div className={'nav-center'}>
    
    
    </div>
    
    
    <div className={'nav-right'}>

    <div style={{display:'flex',alignItems:'center',paddingRight:10}}>
    <input onChange={e=>setSearch(e.target.value)} style={{padding:5}} placeholder={'search'} />
    <button onClick={()=>{
        window.location.href = window.location.pathname+'?s='+search


    }} style={{padding:5}}>Search</button>
    
    </div>

    </div>
    </div>)
}

export default Nav;