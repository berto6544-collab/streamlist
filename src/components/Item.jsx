
const Items= ({item,index}) =>{



    return(
        <div key={index} className={'card'}>
    <a href={item?.media_type == "tv" || item?.first_air_date?'/show/US/'+item?.id : '/movie/US/'+item?.id} className='cardLink'>
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


}



export default Items;