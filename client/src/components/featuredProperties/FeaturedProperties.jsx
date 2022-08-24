import UseFetch from "../../hooks/UseFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {data,loading,error}=UseFetch("/hotels?featured=true&limit=4")
  console.log("featured hotels",data)


  return (
    <div className="fp">
      {loading? "loading" : <>
      {/* ? mark is important load avan time edukum so, allenkil page varila  */}
      {data?.map((item)=>{

        return(
        <div className="fpItem" key={item._id}>
        <img
          src={item.photos[0]}
          alt=""
          className="fpImg"
          />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from {item.cheapestPrice}</span>
        {item.rating && <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>)
        })
      }
      </>
        }
    </div>
  );
};

export default FeaturedProperties;
