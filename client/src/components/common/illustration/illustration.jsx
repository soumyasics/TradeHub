import { Image } from "react-bootstrap";

export const IllustrationSection = ({ imgPath }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Image src={imgPath} alt="Illustration" fluid />
    </div>
  );
};
