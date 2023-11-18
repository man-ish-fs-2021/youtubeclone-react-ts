import { useState } from "react";
import "./App.css";
import { CategoryPills } from "./component";
import { categories } from "./data";
import { PageHeader } from "./pages";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="main-container max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto, 1fr] flex-grow-1 overflow-auto">
        <div>sidebar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
