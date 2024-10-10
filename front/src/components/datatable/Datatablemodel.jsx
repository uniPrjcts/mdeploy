export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return <div>{params.row.username}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
];

export const hotelsColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "nome",
    headerName: "Nome",
    width: 150,
  },
  {
    field: "tipo",
    headerName: "Tipo",
    width: 100,
  },
  {
    field: "cidade",
    headerName: "Cidade",
    width: 150,
  },
];

export const quartosColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "titulo",
    headerName: "Título",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Descrição",
    width: 200,
  },
  {
    field: "preco",
    headerName: "Preço",
    width: 100,
  },
  {
    field: "capacidade",
    headerName: "Capacidade",
    width: 100,
  },
];

export const reservaColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "username",
    headerName: "Usuário",
    width: 100,
    renderCell: (params) => {
      return params.row.username || 'Indisponível';
    },
  },
  {
    field: "nome",
    headerName: "Hotel",
    width: 150,
    renderCell: (params) => {
      return params.row.nome || 'Indisponível';
    },
  },
  {
    field: "titulo",
    headerName: "Quarto",
    width: 150,
    renderCell: (params) => {
      return params.row.titulo || 'Indisponível';
    },
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 100,
    renderCell: (params) => {
      const date = new Date(params.row.checkIn);
      return date instanceof Date && !isNaN(date)
        ? date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', }) : 'Indisponível';
    },
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 100,
    renderCell: (params) => {
      const date = new Date(params.row.checkOut);
      return date instanceof Date && !isNaN(date)
        ? date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', }) : 'Indisponível';
    },
  },
  //{
  //  field: "userId",
  //  headerName: "User",
  //  width: 230,
  //},
  //{
  //  field: "quartoId",
  //  headerName: "Quarto",
  //  width: 230,
  //},
];

// separado para as reservas
//{
//  field: "status",
//  headerName: "Status",
//  width: 160,
//  renderCell: (params) => {
//    return (
//      <div className={`cellStatus ${params.row.status}`}>
//        {params.row.status}
//      </div>
//    );
//  },
//},
