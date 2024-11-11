import React, { useState } from "react";

export default function EventRegistrationForm() {
  // Definizione degli stati per i campi di input del mio form
  const [username, setUsername] = useState(""); // Campo username
  const [email, setEmail] = useState(""); // Campo email
  const [password, setPassword] = useState(""); // Campo password
  const [error, setError] = useState(null); // Stato per i messaggi di errore
  const [success, setSuccess] = useState(null); // Stato per i messaggi di successo
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  // Creo la funzione che gestisce l'invio del form
  function handleSubmit(event) {
    event.preventDefault(); // Previene il refresh
    setError(null);
    setSuccess(null);

    // Controllo lato CLIENT per la password
    if (password.length < 6) {
      setError("Errore: la password deve avere almeno 6 caratteri");
      return;
    }

    // REQRES (PER EVITARE ERRORI)
    // Usiamo la mail accettata dall'api di test altrimenti ci da errore
    const registrationData = { email: "eve.holt@reqres.in", password };
    console.log("Dati di registrazione", registrationData);

    // Prima di effettuare la chiamata, setto lo stato del caricamento a TRUE
    setLoading(true);

    // Invio dei dati all'endpoint di reqres
    fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        setLoading(false); // Se entro nel then, allora il caricamento sarà finito!
        if (!response.ok) {
          throw new Error("Errore nella registrazione - riprova");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Risposta del server:", data);
        setSuccess(
          "Registrazione completata con successo! Ci vediamo all'evento"
        );
        setEmail("");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Errore", error);
        setError("Registrazione fallita, riprova più tardi");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* USERNAME */}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      {/* EMAIL */}
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      {/* PASSWORD */}
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {/* BOTTONE PER L'INVIO */}
      <button type="submit" disabled={loading}>
        {/* Disabilitiamo il bottone durante il caricamento */}
        {/* Usiamo testo condizionale a seconda dello stato */}
        {loading ? "Registrazione in corso..." : "Registrati"}
      </button>

      {/* Mostrare un messaggio di successo */}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Mostrare un messaggio di errore */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
