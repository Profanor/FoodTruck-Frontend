// eslint-disable-next-line @typescript-eslint/no-unused-vars

import "./menupage.css";
import ItemCard from "../../components/ItemCard/ItemCard";
import UserDashboardTopBar from "../../components/Navbar/UserDashboardTopBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface Menu {
  nameofDish: string;
  description: string;
  id: string
}
//Test data for menu page
const categories = [
  {
    image: "pizza.png",
    categoryName: "Pizza",
    categoryImage: "pizza.png",
  },

  {
    image: "category-image-1.png",
    categoryName: "Rice",
    categoryImage: "Rice.png",
  },

  {
    image: "chicken.png",
    categoryName: "Chicken",
    categoryImage: "Chicken.png",
  },

  {
    image: "grilledmeat.png",
    categoryName: "Grilled Meat",
    categoryImage: "Grilled Meat.png",
  },

  {
    image: "burgernfries.png",
    categoryName: "Burger&Fries",
    categoryImage: "Burger&Fries.png",
  },

  {
    image: "burger.png",
    categoryName: "Burger",
    categoryImage: "Burger.png",
  },

  {
    image: "pasta.png",
    categoryName: "Pasta",
    categoryImage: "Pasta.png",
  },

  {
    image: "cocktails.png",
    categoryName: "cocktails",

    categoryImage: "cocktails.png",
  },
];
const categoryItems = [
  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },

  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },

  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },

  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },

  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },

  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },

  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },

  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    image: "food-item-1.png",

    title: "Lorem ipsum dolor sit amet",

    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
];

function MenuPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentCategories, setCurrentCategories] = useState([...categories]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentCategoryItems, setCurrentCategoryItems] = useState([
    ...categoryItems,
  ]);

  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuImages, setMenuImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/restaurant/menus');
        setMenus(response.data.latestMenus);
      } catch (error) {
        console.error('Error fetching latest menus:', error);
      }
    };

    const fetchMenuImages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/restaurant/menusImages');
        setMenuImages(response.data.imageDataArray);
      } catch (error) {
        console.error('Error fetching latest menu images:', error);
      }
    };

    fetchMenus();
    fetchMenuImages();
  }, []);

  const handleOnClick = (id: string) => {
    navigate(`/menudetailspage/${id}`);
  }

  const categoriesList = currentCategories.map((category, index) => {
    return (
      <div key={index} className="category-item">
        <img src={`../images/${category.image}`} />
        <p>{category.categoryName}</p>
      </div>
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryItemsList = currentCategoryItems.map((category, index) => {
    return (
      <ItemCard
        key={index}
        image={category.image}
        title={category.title}
        description={category.description} onclick={undefined}      />
    );
  });
  return (
    <>
      <Sidebar />
        <UserDashboardTopBar />

        {currentCategories.length ? (
          <div className="menupage-container">
          <div className="category-area">
            <div>
              <div className="heading-section">
                <h2 className="category-heading">Category</h2>
                <img
                  src="../images/filter.png"
                  alt="filter icon"
                  className="filter-icon"
                />
              </div>
              <div className="category-list">{categoriesList}</div>
            </div>

            <div className="category-item-area">
              <h2 className="category-item-heading">All menu</h2>
              <div className="sec-col menu-page">
            {menus.map((menu, index) => (
              <ItemCard
                key={index}
                image={`data:image/png;base64,${menuImages[index]}`}
                title={menu.nameofDish}
                description={menu.description}
                onclick={() => handleOnClick(menu.id)}
              />
            ))}
          </div>
            </div>
          </div>
          </div>
        ) : (
          <h1>No Menu Information</h1>
        )}
      
    
    </>
  );
}

export default MenuPage;
