import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
    return (
        <div className="searchItem">
            <img src={item.fotos[0]} className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item.nome}</h1>
                <span className="siDistance">{item.distancia} do centro</span>
                <span className="siTaxiOp">Sem transporte até o lugar</span>
                <span className="siSubtitle">
                    Excelente opção
                </span>
                <span className="siFeatures">
                    {item.desc}
                </span>
                <span className="siCancelOp">Sem opções de cancelamento</span>
                <span className="siCancelOpSubtitle">
                    Sentimos muito
                </span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Wow</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailsText">
                    <span className="siPreco">R${item.taxa_base},00</span>
                    <span className="siTaxOp">Incluindo impostos e taxas:</span>
                    <span className="siPrecoTax">R${item.taxa_base * 1.5},00</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">Disponibilidade</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
