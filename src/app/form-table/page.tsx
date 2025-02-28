"use client";
import React from "react";
import Form from "../../../component/form"
import Table from "../../../component/table"
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import '../i18n'
import { useRouter } from "next/navigation";
import styles from "../page.module.css";


const { Header} = Layout;

const Page: React.FC = () => {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  const router = useRouter();
  return (
    <div>

      <Header style={{ background: "transparent", boxShadow: "none", padding: "10px 20px", display: "flex", justifyContent: "flex-end" }}>
        <div className={styles.languageContainer}>
          <select className={styles.languageSelect} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">EN</option>
            <option value="th">TH</option>
          </select>
        </div>

        <button onClick={() => router.push('/')}>
          Home
        </button>
      </Header>
      <h1>{t('Form & Table')}</h1>

      <Form />
      <Table />
    </div>
  );
};

export default Page;