import UserDashboardTopBar from "../../components/Navbar/UserDashboardTopBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./MenuDetailsPage.css";
import OrangeButton from "../../components/OrangeButton/OrangeButton";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Menu {
  nameofDish: string;
  description: string;
  id: string;
  priceofDish: string;
}

function MenuDetailsPage() {
const { id } = useParams();
  const [userEmail, setUserEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartAmount, setCartAmount] = useState(0);
  const [menus, setMenus] = useState<Menu>();
  // fetching customer details
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/protected-routes/customer", {
          withCredentials: true,
        });
   
        if (response.status === 200 && response.data.customer) {
          setUserEmail(response.data.customer.email);
          setCartAmount(()=>Math.floor(Math.random() * 10000));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
   
    fetchCustomerDetails();
  }, []);

// fetching menu details
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/restaurant/menu/${id}`);
        setMenus(response.data.latestMenus);
        if(response.status === 200 && response.data.latestMenus){
          setMenus(response.data.latestMenus)
        }
      } catch (error) {
        console.error('Error fetching latest menus:', error);
      }
    };



    fetchMenus();

  }, []);

  const handleOrder = async () => {
    try {
      const response = await axios.post("http://localhost:4000/customer/acceptpayment", {
        email: userEmail,
        amount: menus?.priceofDish,
      });
      
      // const authorizationUrl = response.data.data.authorization_url;
      // window.location.href = authorizationUrl;
      if (response.data.data && response.data.data.authorization_url) {
        window.open(response.data.data.authorization_url, "_blank");
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  
  
  return (
    <>
      <Sidebar />
      <section className="menu-details-area">
        <UserDashboardTopBar />
      </section>
      <div className="menu-details-container">
        <div className="food-display-section">
          <img src="../images/menu-details-food-1.png"></img>
          <img src="../images/menu-details-food-2.png"></img>
          <img src="../images/menu-details-food-3.png"></img>
          <div className="food-details">
            <p className="food-name">{menus?.nameofDish}</p>
            <p className="food-price">
              <span style={{ fontWeight: "normal", color: "#828282" }}>₦&nbsp;</span>
            {menus?.priceofDish}
            </p>
            <p className="food-description">
             {menus?.description}
            </p>
          </div>
          <div className="extras-section">
            <p className="extras-section-heading">
              Would you like to add a drink?
            </p>
            <div className="drinks-section">
              <div>
                <img src="../images/drink-1.png" />
              </div>
              <div>
                <img src="../images/drink-2.png" />
              </div>
              <div>
                <img src="../images/drink-3.png" />
              </div>
              <div>
                <img src="../images/drink-4.png" />
              </div>
            </div>
          </div>
          <div className="menu-btn-container">
            <OrangeButton buttonText="Add to Cart" onClick={""}/>
            {/* <Link to="/checkoutpage">
              <OrangeButton buttonText="Order Now" />
            </Link> */}
            <OrangeButton buttonText="Order Now" onClick={handleOrder}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuDetailsPage;
