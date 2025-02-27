"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "../Shapes.module.scss";

const shapesData = [
  { id: 1, type: "triangle" },
  { id: 2, type: "square" },
  { id: 3, type: "circle" },
  { id: 4, type: "ellipse" },
  { id: 5, type: "trapezoid" },
];

export default function LayoutStylePage() {
  const { t } = useTranslation();

  // เก็บค่าองศาการหมุนของแต่ละรูปร่าง
  const [rotations, setRotations] = useState<{ [key: number]: number }>({});
  // เก็บตำแหน่งของรูปร่าง
  const [shapeOrder, setShapeOrder] = useState(shapesData);

  // ฟังก์ชันหมุนรูปร่าง
  const rotateShape = (id: number) => {
    setRotations((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 90, // หมุนทีละ 90 องศา
    }));
  };

  // ฟังก์ชันสลับตำแหน่งรูปร่าง
  const swapShapes = () => {
    setShapeOrder((prev) => {
      const newOrder = [...prev];
      const first = newOrder.shift(); // เอาตัวแรกออก
      if (first) newOrder.push(first); // เอาตัวแรกไปไว้ท้ายสุด
      return newOrder;
    });
  };

  return (
    <div className={styles.container}>
      <h2>{t("Layout & Style")}</h2>
      <div className={styles.grid}>
        {shapeOrder.map((shape) => (
          <motion.div
            key={shape.id}
            className={`${styles.shape} ${styles[shape.type]}`}
            animate={{ rotate: rotations[shape.id] || 0 }}
            transition={{ duration: 0.5 }}
          >
            <button className={styles.btn} onClick={() => rotateShape(shape.id)}>
              {t("Move Shape")}
            </button>
          </motion.div>
        ))}
      </div>
      <button className={styles.swapBtn} onClick={swapShapes}>
        {t("Move Position")}
      </button>
    </div>
  );
}
