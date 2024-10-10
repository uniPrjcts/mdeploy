import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserva.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserva = ({ setOpen, hotelId, user, hotel }) => {
  const [quartosSelecionados, setQuartosSelecionados] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const { dates } = useContext(SearchContext);
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(`/api/hotels/quarto/${hotelId}`);

  useEffect(() => {
    if (error) {
      console.error("Erro no fetch do quarto:", error);
      setFetchError("Falhou em dar load nos dados dos quartos, tente novamente.");
    }
  }, [error]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await axios.get(`/api/reservas/hotel/${hotelId}`);
        setReservas(res.data);
      } catch (err) {
        setFetchError("Falha no fetch das reservas");
        console.error(err);
      }
    };
    fetchReservas();
  }, [hotelId]);

  useEffect(() => {
    console.log("Dados recebidos: ", data);
  }, [data]);

  useEffect(() => {
    console.log("Reservas fetched: ", reservas);
  }, [reservas]);

  const isAvailable = (quarto) => {
    if (!quarto || !reservas) return true;

    return !reservas.some(reserva =>
      reserva.quartoId === quarto._id &&
      (new Date(reserva.checkIn) <= new Date(dates[0].endDate) &&
        new Date(reserva.checkOut) >= new Date(dates[0].startDate))
    );
  };

  const handleSelect = (e) => {
    const selecionado = e.target.checked;
    const value = e.target.value;
    setQuartosSelecionados(
      selecionado
        ? [...quartosSelecionados, value]
        : quartosSelecionados.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      const validData = data.filter(item => item !== null);
      const reservaPromises = quartosSelecionados.map(async (quartoId) => {
        const quarto = validData.find(q => q._id === quartoId);
        if (!quarto) {
          console.error(`Quarto com ID ${quartoId} não encontrado`);
          return null;
        }
        return axios.post("/api/reservas", {
          userId: user._id,
          quartoId,
          checkIn: dates[0].startDate,
          checkOut: dates[0].endDate,
          username: user.username,
          nome: hotel.nome,
          titulo: quarto.titulo,
        });
      });

      const results = await Promise.all(reservaPromises);
      const failedReservations = results.filter(result => result === null);

      if (failedReservations.length > 0) {
        console.error(`${failedReservations.length} reservas falharam`);
        alert(`${failedReservations.length} reservas não puderam ser completadas. Por favor, tente novamente.`);
      } else {
        setOpen(false);
        navigate("/");
      }
    } catch (err) {
      console.error("Erro durante reserva:", err);
      alert("Falhou em fazer a reserva, tente novamente.");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (fetchError) return <div>Erro: {fetchError}</div>;
  if (!data || !Array.isArray(data) || data.length === 0) return <div>Nenhum quarto disponível</div>;

  const validQuartos = data.filter(item => item !== null);

  return (
    <div className="reserva">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Selecione os quartos:</span>
        {validQuartos.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.titulo || 'Sem título'}</div>
              <div className="rDesc">{item.desc || 'Sem descrição'}</div>
              <div className="rMax">
                Capacidade: <b>{item.capacidade || 'N/A'}</b>
              </div>
              <div className="rPreco">R${item.preco},00</div>
            </div>
            <div className="rSelectedRooms">
              <div className="rSelectRooms">
                <div className="quarto">
                  <label>{item.numeroQuarto}</label>
                  <input
                    type="checkbox"
                    value={item._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(item)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton" disabled={loading || quartosSelecionados.length === 0}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default Reserva;







































































































































