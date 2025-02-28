"use client";
import '../i18n';
import { useTranslation } from "react-i18next";
import "./Shapes.css";
import { Layout, Card } from "antd";
import React, { useState } from "react";
import styles from "../page.module.css";


const initialShapes = [
  "square",
  "circle",
  "oval",
  "trapezoid",
  "rectangle",
  "parallelogram",
];

const { Content } = Layout;

export default function ShapesPage() {

  const { t, i18n } = useTranslation();
  const [shapes, setShapes] = useState<string[]>(initialShapes);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  

  // Language change handler
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }



  const shuffleAllShapes = () => {
    // ฟังก์ชันสุ่มตำแหน่งของทุกๆ shape
    setShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      for (let i = newShapes.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [newShapes[i], newShapes[randomIndex]] = [newShapes[randomIndex], newShapes[i]];
      }
      return newShapes;
    });
  };

  const prevPage = () => {
    setShapes((prevShapes) => {
      const lastItem = prevShapes[prevShapes.length - 1];
      return [lastItem, ...prevShapes.slice(0, -1)];
    });
  };

  const nextPage = () => {
    setShapes((prevShapes) => {
      const firstItem = prevShapes[0];
      return [...prevShapes.slice(1), firstItem];
    });
  };

  const toggleSwapRows = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <div>
      <div className={styles.languageContainer}>
        <select className={styles.languageSelect} onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">EN</option>
          <option value="th">TH</option>
        </select>
      </div>

      <h2>{t("Layout & Style")}</h2>
      <Content>
        {/* Navigation */}
        <div className="navigation">
          <Card className="shape-card" onClick={nextPage} style={{ cursor: "pointer" }}>
            <div className="arrow left"></div>
            <div className="btn-text">{t("Move Shape")}</div>
          </Card>


          <Card className="shape-card" onClick={toggleSwapRows}>
            <div style={{ display: "flex" }}>
              <div
                className="arrow up"
                style={{ cursor: "pointer" }}
              ></div>
              <div
                className="arrow down"
                style={{ cursor: "pointer" }}
              ></div>
            </div>
            <div className="btn-text">{t("Move Position")}</div>
          </Card>

          <Card className="shape-card" onClick={prevPage} style={{ cursor: "pointer" }}>
            <div className="arrow right"></div>
            <div className="btn-text">{t("Move Shape")}</div>
          </Card>
        </div>

        {/* Shapes Lists */}
        <div className="shapes-grid">

          {/* แถวแรก */}
          <div className={`row-1 ${isSwapped ? "swapped-right" : "swapped-left"}`}>
            {shapes.slice(0, 3).map((shape, index) => (
              <Card
                key={index}
                className="shape-card"
                onClick={shuffleAllShapes} // เรียกใช้ฟังก์ชันที่สุ่มตำแหน่งทุกตัว
              >
                <div className={`shape ${shape}`} />
              </Card>
            ))}
          </div>

          {/* แถวที่สอง */}
          <div className={`row-2 ${isSwapped ? "swapped-left" : "swapped-right"}`}>
            {shapes.slice(3, 6).map((shape, index) => (
              <Card
                key={index + 3}
                className="shape-card"
                onClick={shuffleAllShapes} // เรียกใช้ฟังก์ชันที่สุ่มตำแหน่งทุกตัว
              >
                <div className={`shape ${shape}`} />
              </Card>
            ))}
          </div>
        </div>
      </Content>

    </div>
  );
}
