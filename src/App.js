import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favourites from "./components/Favourites";
import RecipeItem from "./components/RecipeItem";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveItems, setSaveItems] = useState(() => {
    const localData = localStorage.getItem(recipes);
    return localData ? JSON.parse(localData) : [];
  });

  const inputField = useRef(null);
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    getData(searchQuery);
    setSearchQuery("");
    setRecipes([]);
    inputField.current.blur();
    setError("");
    navigate("/");
  };

  const getData = async (text) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${text}`
      );

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      if (data.results === 0) throw new Error("No recipe found!");
      setRecipes(data?.data?.recipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const existedData = localData.some((item) => item.id === data.id);

    if (!existedData) {
      setSaveItems([...saveItems, data]);
    } else {
      const filteredData = localData.filter((item) => item.id !== data.id);
      setSaveItems(filteredData);
    }
  };

  const favouriteHandler = (id) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data.data.recipe));

    navigate("/favourites");
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(saveItems));
  }, [saveItems]);

  return (
    <>
      <div className="App min-h-screen bg-rose-50 text-gray-600 text-lg">
        <Navbar
          saveItems={saveItems}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          inputField={inputField}
          searchHandler={searchHandler}
        />
        <Routes>
          <Route
            path="/"
            element={<Home recipes={recipes} loading={loading} error={error} />}
          />
          <Route
            path="/favourites"
            element={<Favourites saveItems={saveItems} />}
          />
          <Route
            path="/recipe-item/:id"
            element={
              <RecipeItem
                favouriteHandler={favouriteHandler}
                savedItems={saveItems}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
