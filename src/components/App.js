import React, {useState,useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

const pizzaURL = 'http://localhost:3001/pizzas'

function App() {
  let [pizzas,setPizzas] = useState([]);
  let [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(()=>{
    fetch(pizzaURL)
    .then(r=>r.json())
    .then(pizza=>setPizzas(pizza))
  },[])

  function handleChangeForm(name, value) {
    setSelectedPizza({
      ...selectedPizza,
      [name]: value,
    });
  }

  function handleEditPizza(updatedPizza) {
    const updatedPizzas = pizzas.map((pizza) =>
      pizza.id === updatedPizza.id ? updatedPizza : pizza
    );
    setSelectedPizza(updatedPizza);
    setPizzas(updatedPizzas);
  }

  return (
    <>
      <Header />
      <PizzaForm
        pizza={selectedPizza}
        onChangeForm={handleChangeForm}
        onEditPizza={handleEditPizza} 
        />
      <PizzaList 
        pizzas={pizzas}
        onSelectPizza={setSelectedPizza}
        />
    </>
  );
}

export default App;
