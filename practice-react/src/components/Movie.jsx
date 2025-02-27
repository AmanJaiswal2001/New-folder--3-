import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';

const API_HEADERS = {
    "x-rapidapi-key": "be031c9d11msh1dfe1754665b8e5p1ae61djsn0eff0939a10a",
    "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com"
  };
  

const Movie = () => {
  
  const[product,setProduct]=useState([]);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [currPage, setCurrPage] = useState(1);

  const getMovies=async()=>{
    try{
        const response = await axios.get("https://imdb-top-100-movies.p.rapidapi.com",
             { headers: API_HEADERS });
       
          
        console.log(response.data);
        setProduct(response.data);

    }
    catch (error) {
        console.log("Error Fetching API:", error);
      }
  }

  useEffect(()=>{
    getMovies();
  },[])

  useEffect(() => {
    const filtered = product.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, 
  [search, product]);



  const recPerPage = 12;
          const lastInd = currPage * recPerPage;
          const firstInd = lastInd - recPerPage;
          const rec = filteredMovies?.slice(firstInd, lastInd);
          const npages = Math.ceil(filteredMovies.length / recPerPage);
          const num = [...Array(npages).keys()].map((n) => n + 1);
        
          const nextPage = () => {
            if (currPage < npages) {
              setCurrPage(currPage + 1);
            }
          };
        
          const prevPage = () => {
            if (currPage > 1) {
              setCurrPage(currPage - 1);
            }


        }


    return (
    // <div>
      <>
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold'>Search bar</h1>

      <input type="text"
        className='w-96 p-2 outline-none bg-gray-200 rounded-lg '
        placeholder='Enter movie name'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
<div className='flex  flex-wrap justify-center gap-4'>

      {rec.map((data)=>(
<div className='  '
key={data.id}>
        <Card title={data.title} image={data.big_image}  year={data.year} desc={data.description} />
        </div>
      ))}
      </div>
      <nav className='flex justify-center mt-4 text-sm pt-10'>
          <button onClick={prevPage} disabled={currPage === 1} className='md:px-4 py-2 mx-1 bg-red-400 w-20  rounded disabled:opacity-50'>
          Prev</button>
          {num.map((n) => (
            <button
              key={n}
              onClick={() => setCurrPage(n)}
              className={`md:px-4 px-2 py-2 mx-1 rounded-full ${currPage === n ? 'bg-[#0d6ed0] text-black w-10 text-center h-10' : ''}`}
            >
              {n}
            </button>
          ))}
          <button onClick={nextPage} disabled={currPage === npages} 
          className='px-4 py-2 mx-1  bg-red-400 rounded disabled:opacity-50'>
           Next</button>
           </nav>


      </>
  
  )
}

export default Movie