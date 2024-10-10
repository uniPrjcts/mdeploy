import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {

    const { data, loading, error } = useFetch("/api/hotels/countByType");

    const images = [
        "https://www.dicasdeviagem.com/wp-content/uploads/2021/06/hotel-fasano-boa-vista-quarto.jpg",
        "https://brotas.com.br/wp-content/uploads/2017/08/brotas-eco-resort-01-capa.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/c5/2f/35/gemini-hotel.jpg?w=1200&h=-1&s=1",
    ];

    return (
        <div className="pList">
            {loading ?
                ("Loading, por favor espere"
                ) : (
                    <>
                        {data &&
                            images.map((img, i) => (
                                <div className="pListItem" key={i}>
                                    <img
                                        src={img}
                                        className="pListImg"
                                    />
                                    <div className="pListTitles">
                                        <h1>Hotéis {data[i]?.tipo}s</h1>
                                        <h2>{data[i]?.count} hotéis {data[i]?.tipo}s</h2>
                                    </div>
                                </div>
                            ))}
                    </>)}
        </div>
    );
};

export default PropertyList;
