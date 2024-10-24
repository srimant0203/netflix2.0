import React, { useState } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import MovieList from './MovieList';

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    }

    return (
        <>
            <div className='flex justify-center pt-[10%] w-[100%]'>
                <form onSubmit={submitHandler} className='w-[50%]'>
                    <div className='flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-[100%]'>
                        <input value={searchMovie} onChange={(e) => { setSearchMovie(e.target.value) }} className='w-full outline-none rounded-md text-lg' type="text" placeholder='Search Movies...' />
                        <button className='bg-red-800 text-white rounded-md px-4 py-2'>{isLoading ? "loading..." : "Search"}</button>
                    </div>
                </form>

            </div>
            {
                searchedMovie ? ( <MovieList title={movieName} searchMovie={true} movies={searchedMovie}/>) : (<h1>Movie Not Found!!</h1>)
            }
           
        </>

    )
}

export default SearchMovie

// import React, { useState } from 'react';
// import axios from "axios";
// import { SEARCH_MOVIE_URL, options } from '../utils/constant';
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchMovieDetails } from '../redux/searchSlice';
// import { setLoading } from '../redux/userSlice';

// const SearchMovie = () => {
//     const [searchMovie, setSearchMovie] = useState("");
//     const dispatch = useDispatch();
//     const isLoading = useSelector(store => store.app.isLoading);
//     const { movieName, searchedMovie } = useSelector(store => store.searchMovie);

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         dispatch(setLoading(true));
//         try {
//             const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
//             const movies = res?.data?.results;
//             dispatch(setSearchMovieDetails({ searchMovie, movies }));
//         } catch (error) {
//             console.log(error);
//         } finally {
//             dispatch(setLoading(false));
//         }
//         setSearchMovie("");
//     }

//     return (
//         <>
//             <div className='flex flex-col items-center pt-20 w-full bg-gradient-to-br from-purple-900 via-black to-gray-900 min-h-screen'>
//                 {/* Search Form */}
//                 <form onSubmit={submitHandler} className='w-[50%]'>
//                     <div className='flex justify-between shadow-lg p-2 backdrop-blur-md bg-white/10 border border-white/30 rounded-full'>
//                         <input 
//                             value={searchMovie} 
//                             onChange={(e) => setSearchMovie(e.target.value)} 
//                             className='w-full outline-none rounded-full px-6 py-3 text-lg bg-transparent text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out' 
//                             type="text" 
//                             placeholder='Search Movies...' 
//                         />
//                         <button className='bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-full px-8 py-3 ml-4 transform hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl'>
//                             {isLoading ? (
//                                 <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block"></span>
//                             ) : "Search"}
//                         </button>
//                     </div>
//                 </form>

//                 {/* Movie Posters Only */}
//                 <div className='mt-10 w-full flex flex-wrap justify-center gap-8'>
//                     {
//                         searchedMovie ? (
//                             searchedMovie.map(movie => (
//                                 <div key={movie.id} className='w-[250px] h-[370px] bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1 relative group'>
//                                     <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300'/>
//                                 </div>
//                             ))
//                         ) : (
//                             <h1 className='text-4xl font-extrabold text-red-500 neon-text animate-pulse'>
//                                 Movie Not Found!!
//                             </h1>
//                         )
//                     }
//                 </div>
//             </div>
//         </>
//     );
// }

// export default SearchMovie;







