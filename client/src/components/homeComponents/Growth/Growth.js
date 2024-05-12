import styles from "./Growth.module.css";
import { growth } from "../../../constants/growth";
import GrowthBox from "./GrowthBox";

const imgURL1 =
  "https://d2guulkeunn7d8.cloudfront.net/assets/homepage/homepage_stats-538f51946acc9e8a72b982654287ee0ad8d7a848df2cd860935bbc3c2a97e84a.jpg";
const imgURL2 =
  "https://d2guulkeunn7d8.cloudfront.net/assets/homepage/homepage_stats_mobile-24bd627084eed46859cb6cf670de84feb1de9ef24909f36cb85db410e57313e8.jpg";

const imgURL3 = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220822174800/BARTAR-sytem-nupur-image.jpg";

const Growth = () => {
  return (
    <div className={`${styles.growthWrapper} center`}>
      <div className={`${styles.growthWrapperInner} center`}>
        <div className={styles.growthHeading}>
          <p>The world's largest online barter platform</p>
        </div>
        <div className={styles.growthImg}>
          <img className={styles.img1} src={imgURL3} alt="barter" />
          <img className={styles.img2} src={imgURL2} alt="barter-2" />
        </div>
        <div className={`${styles.growthList} center`}>
          {growth.map(({ field, description }) => {
            return <GrowthBox field={field} description={description} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Growth;
