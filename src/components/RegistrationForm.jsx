import React, { useState } from "react";

export default function RegistrationForm() {
  // Definisco lo stato per ogni campo del form che andrò a realizzare
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  // Funzione che gestisce l'invio dei dati dal form
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Invio dei dati dal form");

    // Creo un oggetto per passare tutti i dati della prenotazione
    // alla POST che farò in seguito
    const reservationData = { name, email, date };
    console.log("Dati della prenotazione:", reservationData);

    // Eseguo una fetch per inviare i dati ad un "fake" endpoint di test
    fetch("https://reqres.in/api/users", {
      method: "POST", // specifico che sto facendo una POST e non una GET
      headers: {
        "Content-Type": "application/json", // Indico che sto passando dati in formato JSON
      },
      body: JSON.stringify(reservationData), // Convertiamo i dati inviando una stringa JSON
    })
      .then((response) => response.json()) // Converto la risposta in json
      .then((data) => {
        console.log("Risposta del server", data);
        // Reset di tutti i campi (stati) del form
        setName("");
        setEmail("");
        setDate("");
      })
      .catch((error) => {
        console.error("Errore nella prenotazione:", error); // Log per eventuali errori
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* NOME */}
      <label>
        Nome:
        <input
          type="text"
          value={name} // Associo il valore dello stato "name" a questo input
          onChange={(e) => {
            setName(e.target.value);
            console.log("Aggiorno nome:", e.target.value);
          }}
        />
      </label>

      {/* EMAIL */}
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log("Aggiorno email:", e.target.value);
          }}
        />
      </label>

      {/* DATA */}
      <label>
        Data:
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            console.log("Aggiorno data:", e.target.value);
          }}
        />
      </label>

      {/* Bottone per l'invio */}
      <button type="submit">Prenota le vacanze</button>
    </form>
  );
}
