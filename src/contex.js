import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
/* __________________________________________________________
//Contex Creattion✅
//Provider✅
//Consumer -lengthy removed | now we use useContext hook

//Use context Hook is being used (It relacedconsumer )✅
__________________________________________________________*/

/* __________________________________________________________

__________________________________________________________*/
let API = "http://hn.algolia.com/api/v1/search?";
const initialState = {
  isLoading: true,
  query: "CSS",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext(); //Contex Creattion ✅

//to cereate a Provider function
const AppProvider = ({ children }) => {
  // const [state, setstate] = useState(initialState);

  // insted of using useState we are using ==>> useReducer
  const [state, dispatch] = useReducer(reducer,initialState);

  const featchApiData = async (url) => {

    dispatch({type:"SET_LOADING"});

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type:"GET_STORIES",
        payload:{
            hits: data.hits,
            nbPages: data.nbPages,
        },            
    });
      // isLoading =false;
    } catch (error) {
      console.log(error);
    }
  };

  // to remove the post
  const removePost = (post_ID) => {
    dispatch({ type: "REMOVE_POST", payload: post_ID });
  };
  // search
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };
  // pagination
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

  // to call teh api func
  useEffect(() => {
    featchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return <AppContext.Provider value={{ ...state,removePost,searchPost,getNextPage,getPrevPage }}>{children}</AppContext.Provider>;
};

//Custom Hook Creation - ehich means we are returing a hook inside your custom Hook
// ,for that your function name shoud be starting from "use" for eg-useGlobalContext
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
