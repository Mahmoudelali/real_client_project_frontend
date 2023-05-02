import React from "react";
import Image1 from "../../images/pexels-lumn-322207.jpg";
import Image2 from "../../images/jacket-preview.png";
import Image3 from "../../images/Black-Walnut-Shirt-0626_600x.webp";
import "./instruction.css";

const Instruction = () => {
  return (
    <div className="instruction-container">
      <h1 className="instruction-title">Instructions</h1>
      <p className="instruction-text">
        Here are some instructions to follow when posting images of your
        products:
      </p>
      <ol className="instruction-list">
        <li className="instruction-list-item">
          <span className="instruction-number">1. </span>
          <strong>Use good lighting:</strong>
          <img
            src={Image1}
            alt="Example of good lighting"
            className="instruction-image"
          />
          <p className="instruction-description">
            Make sure to take pictures of your product in a well-lit area to
            ensure that the details of the product are clearly visible.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">2. </span>
          <strong>Take multiple pictures and choose the best one:</strong>
          <img
            src={Image2}
            alt="Example of multiple pictures"
            className="instruction-image"
          />
          <p className="instruction-description">
            Take multiple pictures of the product from different angles and
            merge them in one image to give potential buyers a better idea of
            what the product looks like.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">3. </span>
          <strong>Use a solid background:</strong>
          <img
            src={Image3}
            alt="Example of a solid background"
            className="instruction-image"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <p className="instruction-description">
            To make your product stand out, use a plain and solid-colored
            background. Avoid using busy backgrounds that can distract from the
            product.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">4. </span>
          <strong>Show the condition of the product:</strong>
          <p className="instruction-description">
            If the product has any wear or tear, make sure to take pictures of
            those areas to show the condition of the product.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">5. </span>
          <strong>Include accurate information:</strong>
          <p className="instruction-description">
            Make sure to provide accurate information about the product such as
            its brand, size, color, and any flaws it may have.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">6. </span>
          <strong>Use high-quality images:</strong>
          <p className="instruction-description">
            Use high-quality images that are clear and not blurry. This will
            make your product look more professional and attractive to potential
            buyers.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">7. </span>
          <strong>Edit your images:</strong>
          <p className="instruction-description">
            Use image editing tools to crop, rotate or adjust the brightness and
            contrast of your images to make them look more appealing.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">8. </span>
          <strong>Be honest:</strong>
          <p className="instruction-description">
            Be honest about the product you are selling, and do not misrepresent
            its condition or quality. This will help you build trust with
            potential buyers and increase the likelihood of a successful sale.
          </p>
        </li>

        <li className="instruction-list-item">
          <span className="instruction-number">9. </span>
          <strong>Use descriptive titles:</strong>
          <p className="instruction-description">
            Use descriptive and clear titles that accurately describe the
            product to attract potential buyers.
          </p>
        </li>
        <li className="instruction-list-item">
          <span className="instruction-number">10. </span>
          <strong>Follow the terms and conditions:</strong>
          <p className="instruction-description">
            Make sure to follow the terms and conditions of the web application
            to avoid any issues with your account or the products you are
            selling.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default Instruction;
