import UserDashboardTopBar from "../components/Navbar/UserDashboardTopBar";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MenuDetailsPage.css";
import OrangeButton from "../components/OrangeButton/OrangeButton";

function MenuDetailsPage() {
  return (
    <section className="menu-details-container">
      <Sidebar />
      <section className="menu-details-area">
        <UserDashboardTopBar />

        <div className="food-display-section">
          <img src="../images/menu-details-food-1.png"></img>
          <img src="../images/menu-details-food-2.png"></img>
          <img src="../images/menu-details-food-3.png"></img>
        </div>
        <div className="food-details">
          <p className="food-name">Peppered lap with Grilled Fish</p>
          <p className="food-price">
            <span style={{ fontWeight: "normal", color: "#828282" }}>#</span>
            5,000
          </p>
          <p className="food-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            impedit
            <br /> obcaecati iste inventore unde neque odio ipsum earum eum
            harum ipsum dolor sit <br />
            obcaecati iste inventore unde neque odio ipsum earum eum harum dolor
            sit ipsum lorem
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
          <OrangeButton text="Add to Cart" />
          <OrangeButton text="Order Now" />
        </div>
      </section>
    </section>
  );
}

export default MenuDetailsPage;
