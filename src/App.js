import React, { useState } from "react";
import uuid from "uuid/v4";

function NewMovement({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [amountText, setAmountText] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ description, amount: Number(amountText) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={event => setDescription(event.target.value)}
        aria-label="description"
        placeholder="Description"
      />
      <input
        type="number"
        value={amountText}
        onChange={event => setAmountText(event.target.value)}
        aria-label="amount"
        placeholder="$ amount"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function Movement({ movement, partialTotal, deleteMovement }) {
  return (
    <div>
      <div>{movement.description}</div>
      <div>$ {movement.amount}</div>
      <div>$ {partialTotal}</div>
      <div>
        <button type="button" onClick={deleteMovement}>
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [movements, setMovements] = useState([]);

  const handleNewMovement = data => {
    const newMovement = {
      id: uuid(),
      ...data
    };
    setMovements([...movements, newMovement]);
  };

  const deleteMovement = movement => {
    setMovements(movements => movements.filter(m => m.id !== movement.id));
  };

  let partialTotal = 0;
  const total = movements.reduce((sum, movement) => sum + movement.amount, 0);

  return (
    <div className="App">
      <div data-testid="total">Total: US$ {total}</div>

      <NewMovement onSubmit={handleNewMovement} />

      <ul>
        {movements.map(movement => {
          partialTotal = partialTotal + movement.amount;
          return (
            <li key={movement.id}>
              <Movement
                movement={movement}
                partialTotal={partialTotal}
                deleteMovement={() => deleteMovement(movement)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
