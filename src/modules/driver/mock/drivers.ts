export const mockDrivers = [
  {
    id: 1,
    name: "Homer Simpson",
    description:
      "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    min_km_fee: 2.5,
    min_trip_km: 1,
    createdAt: "2024-11-25T01:59:21.207Z",
    updatedAt: "2024-11-25T01:59:21.207Z",
    deletedAt: null,
    Review: [
      {
        id: 1,
        rating: 2,
        comment:
          "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        driver_id: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Dominic Toretto",
    description:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    min_km_fee: 5,
    min_trip_km: 5,
    createdAt: "2024-11-25T02:01:32.116Z",
    updatedAt: "2024-11-25T02:01:32.116Z",
    deletedAt: null,
    Review: [
      {
        id: 2,
        rating: 4,
        comment:
          "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        driver_id: 2,
      },
    ],
  },
  {
    id: 3,
    name: "James Bond",
    description:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    min_km_fee: 10,
    min_trip_km: 10,
    createdAt: "2024-11-25T02:02:57.801Z",
    updatedAt: "2024-11-25T02:02:57.801Z",
    deletedAt: null,
    Review: [
      {
        id: 3,
        rating: 5,
        comment:
          "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        driver_id: 3,
      },
    ],
  },
];
