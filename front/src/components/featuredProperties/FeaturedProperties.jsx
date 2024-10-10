import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css"
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch("/api/hotels?featured=true");
    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);

    const handleNavigation = (id) => {
        const defaultDates = [{ startDate: new Date(), endDate: new Date(), key: 'selection', }];
        const defaultOptions = { adultos: 1, criancas: 0, quartos: 1, };

        dispatch({ type: "NEW_SEARCH", payload: { destination: "", dates: defaultDates, options: defaultOptions } });
        navigate(`/hotels/${id}`);
    }

    return (
        <div className="fProp">
            {loading ? "Loading, por favor aguarde" : (<>
                {data.map(item => (
                    <div className="fpItem" key={item._id}>
                        <img src={item.fotos[0]} className="fpImg" onClick={() => handleNavigation(item._id)} />
                        <span className="fpNome">{item.nome}</span>
                        <span className="fpCity">{item.cidade.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        <span className="fpPreco">A partir de R${item.taxa_base},00</span>
                        {item.rating && <span className="fpRating">
                            <button>{item.rating}</button>
                            <span>Wow</span>
                        </span>}
                    </div>))}</>)}
        </div>
    );
}

export default FeaturedProperties;
