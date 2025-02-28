"use client";
import './i18n';
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";
import { Layout, Card, Row, Col } from "antd";
import { useRouter } from "next/navigation";

interface CardItem {
    title: string;
    description: string;
    path: string;
}

export default function Page() {
    const { t, i18n } = useTranslation();
    const { Content } = Layout;
    const router = useRouter();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    const cardData: CardItem[] = [
        { title: t("Test 1"), description: t("Layout & Style"), path: "/layout-style" },
        { title: t("Test 2"), description: t("Context API"), path: "/context-api" },
        { title: t("Test 3"), description: t("Form & Table"), path: "/form-table" },
    ];

    return (
        <div className={styles.home}>
            <div className={styles.languageContainer}>
                <select className={styles.languageSelect} onChange={(e) => changeLanguage(e.target.value)}>
                    <option value="en">EN</option>
                    <option value="th">TH</option>
                </select>
            </div>

            {/* Main Content */}
            <Content>
                <Row gutter={16} justify="center">
                    {cardData.map((item, index) => (
                        <Col key={index}>
                            <Card
                                style={{ width: 250, cursor: "pointer" }} // ✅ Add cursor pointer
                                onClick={() => router.push(item.path)} // ✅ Use router.push()
                            >
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </div>
    );
};
