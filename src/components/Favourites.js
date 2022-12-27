import Recipe from "./Recipe";

const Favourites = ({ saveItems }) => {
  return (
    <div className="favourite-section">
      {saveItems.length === 0 && (
        <p className="text-2xl lg:text-4xl font-semibold text-rose-300 text-center pt-10">
          Favourite list is empty!
        </p>
      )}

      <div className="favourite-items-container container mx-auto py-10 flex flex-wrap gap-10 justify-center">
        {saveItems.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
