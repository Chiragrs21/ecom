import { useState } from "react";
import Navigation from "./Navigation/Nav";
import Page from "./Page/Page";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";
import Empty from "./Empty/Empty";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(3);

  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  let result = filteredData(products, selectedCategory, query);

  let toggle = true;
  let empty = false;

  if (result.length === 0) {
    empty = true;
  }



  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;
  const currentpost = result.slice(firstpostindex, lastpostindex)



  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      {toggle && <Products result={currentpost} />}
      {toggle && <Page totalposts={result.length} postperpage={postperpage} setcurrentpage={setcurrentpage} />}
      {empty && <Empty />}

    </>
  );
}

export default App;
