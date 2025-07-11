import React, { useEffect } from "react";
import "./Teams.css";

const imageList = [
  "AsthaKumari.png",
  "PranshuSharma.png",
  "SaranshMathur.png",
  "IshitaAgarwal.png",
  "RuchitKhandelwal.png",
  "VanshikaSingh.png",
  "SparshTyagi.png",
  "DakshSachdeva.png",
  "PrakharSharma.png",
  "ApoorvMittal.png",
  "IshiBharadwaj.png",
  "MedhaviKhandelwal.png",
  "ApoorvaSoni.png",
  "DakshaPandey.png",
  "MohdAayaan.png",
  "AnoushkaKaushik.png",
  "ManayavVatsal.png",
  "Dr.AbhayKumar.png",
];

const Teams = () => {
  useEffect(() => {
    const slider = document.querySelector(".slider");
    const items = document.querySelectorAll(".slider .item");
    const quantity = items.length;

    function getCurrentRotationY(el) {
      const computedStyle = window.getComputedStyle(el);
      const transform = computedStyle.transform || computedStyle.webkitTransform;
      if (transform === "none") return 0;
      const values = transform.split('(')[1].split(')')[0].split(',');
      const matrix = values.map(parseFloat);
      const rad = Math.atan2(matrix[2], matrix[0]);
      const deg = rad * (180 / Math.PI);
      return (deg + 360) % 360;
    }

    function updateVisibleItems() {
      const rotation = getCurrentRotationY(slider);
      const anglePerItem = 360 / quantity;

      items.forEach((item, index) => {
        const itemAngle = ((index) * anglePerItem - rotation + 360) % 360;
        if (itemAngle <= 30 || itemAngle >= 330) {
          item.classList.add("visible");
        } else {
          item.classList.remove("visible");
        }
      });
    }

    const interval = setInterval(updateVisibleItems, 30);

    const handleMouseOver = (e) => {
      if (e.target.closest(".item.visible")) {
        slider.style.animationPlayState = "paused";
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest(".item.visible")) {
        slider.style.animationPlayState = "running";
      }
    };

    slider.addEventListener("mouseover", handleMouseOver);
    slider.addEventListener("mouseout", handleMouseOut);

    return () => {
      clearInterval(interval);
      slider.removeEventListener("mouseover", handleMouseOver);
      slider.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="teams-section">
      <div className="banner">
        <div className="slider" style={{ "--quantity": imageList.length }}>
          {imageList.map((img, idx) => (
            <div className="item" key={idx} style={{ "--position": idx + 1 }}>
              <img src={`/images-teams/${img}`} alt={`Team Member ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
