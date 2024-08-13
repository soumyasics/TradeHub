import aboutImg from "../../assets/images/about-im.png";
import Footer from "../Footer/Footer";
import UserNavbar from "../homeComponents/Navbar/UserNavbar";
export const AboutPage = () => {
  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <div className="container text-center">
          {/* <h4 className="user-landing-find" id="landing-about-us">
            About Us
          </h4> */}
        </div>
        <div className="container mt-5">
          <img
            src={aboutImg}
            className="userlandingfamily container"
          ></img>
        </div>
        <div className="mt-5 mb-5">
          <div className="about-us-content">
            <h2>About Us</h2>
            <p>
              In a world driven by rapid innovation and a growing emphasis on
              sustainability, Trade Hub emerges as a beacon of change,
              redefining the way we think about exchanging goods. More than just
              an app, Trade Hub is a dynamic marketplace where every interaction
              tells a story of discovery, connection, and a commitment to a more
              sustainable future.
            </p>

            <p>
              At Trade Hub, users are not just buyers and sellers—they are
              active participants in a thriving community bound by a shared
              vision of conscious consumption. Each listing is more than an item
              for trade; it's an opportunity to explore something new or to pass
              on something that once held value. We believe that every
              transaction within our platform is a story in itself, fostering
              relationships, sparking creativity, and promoting resourcefulness.
            </p>

            <h3>Our Mission</h3>
            <p>
              Our mission is simple: to create a space where simplicity meets
              innovation. Trade Hub is designed to make trading effortless and
              enjoyable. Browse through a curated selection of items that align
              with your interests and preferences, and connect with like-minded
              individuals through our intuitive messaging system. We prioritize
              transparency and trust, ensuring that every exchange is not only
              secure but also meaningful.
            </p>

            <h3>The Trade Hub Experience</h3>
            <p>
              Trade Hub is more than a marketplace—it's a community. We strive
              to build an environment where every trade is an opportunity to
              make connections, share stories, and contribute to a more
              sustainable world. Whether you're looking to discover something
              new, find a unique item, or simply engage in a more sustainable
              lifestyle, Trade Hub is your platform.
            </p>
            <p>
              Our platform is built on the belief that simplicity should never
              compromise quality. Our user-friendly interface allows you to
              navigate through listings with ease, while our secure transaction
              system ensures that every exchange is conducted with the utmost
              integrity. We are committed to creating a marketplace where trust
              is paramount, and where the possibilities for discovery are
              endless.
            </p>

            <h3>Why Choose Trade Hub?</h3>
            <ul>
              <li>
                <strong>Sustainability</strong>: Embrace a more sustainable
                lifestyle by engaging in trades that reduce waste and promote
                the reuse of goods.
              </li>
              <li>
                <strong>Community</strong>: Join a vibrant community of
                like-minded individuals who share your passion for conscious
                consumption and meaningful exchanges.
              </li>
              <li>
                <strong>Innovation</strong>: Experience a platform that
                seamlessly blends simplicity with cutting-edge technology to
                enhance your trading experience.
              </li>
              <li>
                <strong>Trust</strong>: Engage in transactions with confidence,
                knowing that our platform prioritizes transparency, security,
                and trust.
              </li>
            </ul>

            <h3>Join Us</h3>
            <p>
              Welcome to Trade Hub, where every trade is more than just a
              transaction—it's a journey towards a more connected and
              sustainable world. We invite you to be part of this movement,
              where connections are forged, stories are shared, and
              possibilities are limitless.
            </p>
            <p>
              Join us today and discover the difference that conscious
              consumption can make. Welcome to Trade Hub, where the future of
              trading begins.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
