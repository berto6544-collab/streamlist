import React from 'react';
import FlatList from 'react-infinite-scroll-component';
import {BrowserRouter as Router, Routes,Route,Navigate,useLocation,useParams} from 'react-router-dom';
import '../css/styleGenre.css';
import jsonData from '../json/MovieList.json';
import Player from 'react-player';



const Genre = () =>{


    const {id,code} = useParams();
    const [dataSource,setDataSource] = React.useState([])
    const [StreamdataSource,setStreamDataSource] = React.useState([])
    const [ProvidersdataSource,setProvidersDataSource] = React.useState([])
    const [search,setSearch] = React.useState('');
    const [providerIndex,setProviderIndex] = React.useState(0);
    const [hasMore,sethasMore] = React.useState(true);
    const [randIndex,setRandIndex] = React.useState(0);
   
    React.useEffect(()=>{

      



        const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+process.env.REACT_APP_TMBD_API+'';    
        
        const urlTrailer = 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key='+process.env.REACT_APP_TMBD_API+''; 
    
        const urlProviders = 'https://api.themoviedb.org/3/movie/'+id+'/watch/providers?api_key='+process.env.REACT_APP_TMBD_API+''; 
    

        


            fetch(url)
            .then(res=>res.json())
            .then(responseJSON=>{
        

                //console.log(responseJSON);
                if(responseJSON == undefined)return;
        
                //if(responseJSON.results.length == 0)return sethasMore(false);
                

                setDataSource([responseJSON]);
                //sethasMore(responseJSON.hasMore)
                
        
        
            })



            //fetch trailer of the movie
            fetch(urlTrailer)
            .then(res=>res.json())
            .then(responseJSON=>{
        

                //console.log(responseJSON);
                if(responseJSON == undefined)return;
        
                if(responseJSON?.results.length == 0)return sethasMore(false);
                
                setRandIndex(rand(0,responseJSON.results.length-1))
                setStreamDataSource(responseJSON?.results);
                
        
        
            })






 //fetch providers too watch movie
 fetch(urlProviders)
 .then(res=>res.json())
 .then(responseJSON=>{


     //console.log(responseJSON);
     if(responseJSON == undefined)return;

     //if(responseJSON.results.length == 0)return sethasMore(false);
     


     //Search for the providers that are streaming these movies or shows
     //{US = Netflix, HULU}  {AU = Netflix, Binge, Stan} 

     //convert json into an array
     setProvidersDataSource(Object.values(responseJSON?.results));
     
     
     // Create cont array variable & grab the keys from the json
     const array =  Object.keys(responseJSON?.results);

     //if the const array value == {US,AU,GB,UK} & so on.
     setProviderIndex(array.findIndex(val => val == code.toUpperCase()));



 })





    },[])



    function rand(min, max) {
        var offset = min;
        var range = (max - min) + 1;
      
        var randomNumber = Math.floor( Math.random() * range) + offset;
        return randomNumber;
      }

const rating = (value) =>{

return value / 10;

}



if(dataSource.length == 0){
    
    return(<></>)
}



//use the id to grab the data from the array


const items = dataSource.map((item,index)=>{

return(

<div key={item.id} className={'image'}>


<div className={'back'} >



 {/*This is where the title,overview,genre,duration stored*/}   
<div className={'ImageBack'}>

{/*This is the title*/}  

<h1  className={'Title'}>{item?.title}</h1>


{/*This is the overview*/}
<b>Overview</b>

<p >{item?.overview}</p>



{/*This is the duration*/}
<div className={'infoSpan'}>

<b>{item?.type} Duration: </b>

<span >{item?.runtime} min</span>
</div>
<div className='streamInffo'>



{/*This is the genre*/}
<div className={'infoSpan'}>
<b>Genre</b>
<div className={'inffo'}>
    {item?.genres.map((itemm,indexx)=>{

return(<span  style={{marginRight:5}} key={itemm.id}>{itemm.name} </span>)

    })}
</div>

</div>

</div>


<div className='streamInffo'>



{/*This is the rating*/}
<div className={'infoSpan'}>
<b>Rating</b>
<div className={'inffo'}>
<span>{item?.vote_average}/10</span>
</div>

</div>

</div>

<div className='streamInffo'>
<b>Companies</b>
<div className={'inffo'}>
{item.production_companies.map((companyitem,companyindex)=>{
return(
    <div style={{padding:10}}>
    <a key={companyitem.id}   ><img style={{width:60}} src={'https://image.tmdb.org/t/p/original'+companyitem?.logo_path} alt={companyitem?.name} /></a>
    
    </div>)


})}

</div>



</div>

<div className='streamInffo'>



{/*This is the streaming on*/}
{ProvidersdataSource.length > 0 &&  ProvidersdataSource[providerIndex]?.flatrate != undefined?<div className={'infoSpan'}>
<b>Stream on</b>
<div className={'inffo'}>

{ProvidersdataSource[providerIndex]?.flatrate.map((ittem,indexing)=>{

return(
<div>
<a key={ittem.provider_id} href={ProvidersdataSource[providerIndex].link} ><img style={{width:40,height:40}} src={'https://image.tmdb.org/t/p/original'+ittem?.logo_path} alt="" /></a>

</div>)


})}

</div>

</div>: ProvidersdataSource.length > 0 &&  ProvidersdataSource[providerIndex]?.ads != undefined? <div className={'infoSpan'}>
<b>Stream on</b>
<div className={'inffo'}>

{ProvidersdataSource[providerIndex]?.ads.map((ittem,indexing)=>{

return(
<div>
<a key={ittem.provider_id} href={ProvidersdataSource[providerIndex].link} ><img style={{width:40,height:40}} src={'https://image.tmdb.org/t/p/original'+ittem?.logo_path} alt="" /></a>

</div>)


})}

</div>

</div>: null}



</div>






</div>



{/*This is where the Youtube player is stored */}
{StreamdataSource[randIndex]?.key != ""?<div className={'ImageBack'}>
<Player  width={'100%'} style={{backgroundColor:'black'}}  playing={true} height={450} light={true}  controls url={StreamdataSource[randIndex]?.site == "YouTube" ? 'https://youtube.com/watch?v='+StreamdataSource[randIndex]?.key :'https://vimeo.com/'+StreamdataSource[randIndex]?.key} />

</div>:null}
</div>

<img style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover'}} src={'https://image.tmdb.org/t/p/w780'+item?.backdrop_path}  />

</div>










)
})

return(<div className={'container'}>
    
    {items}
    
    </div>)

}



export default Genre;