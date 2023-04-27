import React from 'react';
import FlatList from 'react-infinite-scroll-component';
import '../css/style.css';

import { useSearchParams  } from 'react-router-dom';
import Nav from '../components/Nav';

const Home = () =>{

    const [searchParams, setSearchParams] = useSearchParams(); 
    const [dataSource,setDataSource] = React.useState([]);
    const [dataSourceTv,setDataSourceTv] = React.useState([]);
    const [search,setSearch] = React.useState(searchParams?.get('s'));
    const [status,setStatus] = React.useState('');
    const [Page,setPage] = React.useState(1);
    const [PageTv,setPageTv] = React.useState(1);
    const [hasMore,sethasMore] = React.useState(true);
    const [next,setnext] = React.useState('');

    let url = 'https://api.themoviedb.org/3/discover/movie/?api_key='+process.env.REACT_APP_TMBD_API;

    React.useEffect(()=>{





//we are not grabing the data from the api from themoviedb.org;
if(!searchParams?.get('s')){
           
    // url = 'https://api.themoviedb.org/3/discover/movie/?api_key='+process.env.REACT_APP_TMBD_API+'&page='+Page;
    url = 'https://api.themoviedb.org/3/discover/movie/?api_key='+process.env.REACT_APP_TMBD_API;

 }else{

//we are not grabing the data from the api from themoviedb.org;

url = 'https://api.themoviedb.org/3/search/movie?api_key='+process.env.REACT_APP_TMBD_API+'&query='+searchParams?.get('s');

 }
fetch(url+'&page='+Page)
.then(res=>res.json())
.then(responseJSON=>{


if(responseJSON == undefined)return;
setDataSource(responseJSON?.results);
setPage(Page+1)





})


/*fetch(urlTv)
.then(res=>res.json())
.then(responseJSON=>{


if(responseJSON == undefined)return;
setDataSource(responseJSON?.results);

mergeTwoRandom([dataSource],[responseJSON?.results])

setPageTv(responseJSON?.page+1)



console.log(responseJSON?.results)




})*/



 
	



    },[])



const fetchMore = () =>{

//we are not grabing the data from the api from themoviedb.org;
if(!searchParams?.get('s')){
           
    // url = 'https://api.themoviedb.org/3/discover/movie/?api_key='+process.env.REACT_APP_TMBD_API+'&page='+Page;
    url = 'https://api.themoviedb.org/3/discover/movie/?api_key='+process.env.REACT_APP_TMBD_API;

 }else{

//we are not grabing the data from the api from themoviedb.org;

url = 'https://api.themoviedb.org/3/search/movie?api_key='+process.env.REACT_APP_TMBD_API+'&query='+searchParams?.get('s');

 }



//const urlTv = 'https://api.themoviedb.org/3/discover/tv/?api_key='+process.env.REACT_APP_TMBD_API+'&page='+PageTv;
fetch(url+'&page='+Page)
.then(res=>res.json())
.then(responseJSON=>{


if(responseJSON == undefined)return;
setDataSource(dataSource.concat(responseJSON?.results));
setPage(Page+1)





})

}


    function mergeTwoRandom(arr1, arr2) {

        function extractRandom(arr) {
            var index = Math.floor(Math.random() * arr.length);
            var result = arr[index];
            // remove item from the array
            arr.splice(index, 1);
            return(result);
        }
    
        var result = [];
        while (arr1.length || arr2.length) {
            if (arr1.length) {
                result.push(extractRandom(arr1));
            }
            if (arr2.length){
                result.push(extractRandom(arr2));
            }
        }
        return(result);
    }



    const rating = (value) =>{

        return value / 10;
        
        }

const Items = dataSource.map((item,index)=>{
    return(
    <div key={index} className={'card'}>
    <a href={'/movie/US/'+item?.id} className='cardLink'>
        <b className={'viewMore'}>More</b>

    </a>
    
   
    <img style={{width:'100%',height:300,objectFit:'cover'}} src={'https://image.tmdb.org/t/p/original'+item?.poster_path} />



<div className={'overview'}>
    <h3 className={'title'}>{item?.title || item?.name}</h3>
   
    <p>{item?.overview}</p>
    

    <div className={'info'}>
    <b>Release Date</b>
    <p>{item?.release_date}</p>

    </div>
    
    <div className={'info'}>
        <b>Rating</b>
        <span>{item?.vote_average}/10</span></div>
    
        </div>
    </div>
    
    
    )

})


    return(
    
    <div className={'container'} >
    
    <Nav />

    <FlatList
    dataLength={dataSource.length}
    className={status==""?'grid':'status'} 
    next={fetchMore}
    hasMore={hasMore}
    
    
    >
   {Items} 

    </FlatList>

        



    </div>)
}


export default Home;