"use client";

import React, { useEffect, useState } from "react";
import { Table, Checkbox, Button, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/app/redux/store";
import { resetForm, addForm } from "../src/app/redux/formSlice"; // import addForm for deleting a single entry
import { useTranslation } from "react-i18next";

const LOCAL_STORAGE_KEY = "formData";

const CustomTable: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form);
  const [isClient, setIsClient] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]); // สำหรับจัดการแถวที่เลือก
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to handle "Select All"
  const handleSelectAll = () => {
    // ถ้าเลือกทั้งหมดแล้ว ให้ลบการเลือก
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]); // ล้างการเลือกทั้งหมด
    } else {
      setSelectedRowKeys(data.map(item => item.key)); // เลือกทุกแถว
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one entry to delete.");
      return;
    }

    // ยืนยันการลบ
    const isConfirm = window.confirm("Are you sure you want to delete the selected entries?");
    if (isConfirm) {
      // ลบข้อมูลที่เลือก
      const updatedData = data.filter(item => !selectedRowKeys.includes(item.key));
      dispatch(resetForm()); // ลบข้อมูลใน Redux state
      updatedData.forEach(item => dispatch(addForm(item))); // บันทึกข้อมูลใหม่ลง Redux state หลังจากลบ
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData)); // อัพเดต Local Storage
      setSelectedRowKeys([]); // รีเซ็ตการเลือกแถว
      message.success("Selected entries deleted successfully.");
    }
  };

  // **แสดง UI เฉพาะเมื่อเป็น client**
  if (!isClient) return null;

  const columns: ColumnsType<any> = [
    {
      title:t('name'),
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('gender'),
      dataIndex: "gender",
    },
    {
      title: t('mobile'),
      dataIndex: "mobile",
    },
    {
      title: t('nationality'),
      dataIndex: "nationality",
    },
    {
      title: t('Manage'),
      dataIndex: "manage",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link">EDIT</Button>
          <Button type="link" danger onClick={() => handleDeleteSingle(record.key)}>
            DELETE
          </Button>
        </Space>
      ),
    },
  ];

  const handleSelect = (key: string) => {
    setSelectedRowKeys(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  const handleDeleteSingle = (key: string) => {
    // ยืนยันการลบข้อมูลเดียว
    const isConfirm = window.confirm("Are you sure you want to delete this entry?");
    if (isConfirm) {
      const updatedData = data.filter(item => item.key !== key);
      dispatch(resetForm()); // ลบข้อมูลใน Redux state
      updatedData.forEach(item => dispatch(addForm(item))); // บันทึกข้อมูลใหม่ลง Redux state หลังจากลบ
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData)); // อัพเดต Local Storage
      message.success("Entry deleted successfully.");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys, // อัพเดท selectedRowKeys เมื่อเลือกแถว
  };

  return (
    <div style={{ padding: "20px" }}>
      <Checkbox    onClick={handleSelectAll}
        type="default"
        style={{ marginBottom: "10px", marginRight: "10px" }}/>
        {selectedRowKeys.length === data.length ? t('deselectall') : t('selectall')}
     
      <Button
        onClick={handleDeleteSelected}
        type="primary"
        danger
        style={{ marginBottom: "10px", marginRight: "10px" }}
      >
        {t('delete')}
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowSelection={rowSelection} 
      />
    </div>
  );
};

export default CustomTable;