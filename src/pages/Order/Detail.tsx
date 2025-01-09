import {
  Row,
  Input,
  Col,
  Modal,
  Button,
  Form,
  Select,
  Descriptions,
  Table,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ColumnType } from "antd/es/table";

// Define interfaces
interface Customer {
  name: string;
  phone_number: string;
  email: string;
}

interface Product {
  name: string;
  price: number;
}

interface Combo {
  name: string;
}

interface OrderDetail {
  product?: Product;
  combo?: Combo;
  quanity: number;
}

interface OrderData {
  customer: Customer;
  total_price: number;
  address?: string;
  order_details?: OrderDetail[];
}

interface DetailProps {
  data: OrderData | null;
  isOpen: boolean;
  handleModal: () => void;
  setData: (data: OrderData | null) => void;
}

const Detail: React.FC<DetailProps> = ({
  data,
  isOpen,
  handleModal,
  setData,
}) => {
  const [addressName, setAddressName] = useState<string>("");

  const nameAdress = async (lat: number, lng: number): Promise<void> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "Accept-Language": "vi",
          },
        }
      );
      setAddressName(response.data.display_name);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data) {
      if (data?.address) {
        const result = data.address.replace(/[\[\]]/g, "");
        const split = result.split(",");
        nameAdress(parseFloat(split[0]), parseFloat(split[1]));
      }
    } else {
      nameAdress(21.001881582088934, 105.73372572109439);
    }
  }, [data]);

  const columns: ColumnType<OrderDetail>[] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 30,
      align: "center",
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (_: any, record: OrderDetail) => {
        return record?.product ? record?.product?.name : record?.combo?.name;
      },
    },
    {
      title: "Giá",
      dataIndex: "product",
      render: (text: Product) => {
        return text.price;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quanity",
    },
  ];

  const handleClostModal = (): void => {
    handleModal();
    setData(null);
  };

  return (
    <Modal
      open={isOpen}
      width={1000}
      onCancel={() => handleClostModal()}
      footer={[]}
    >
      <div className="" onClick={() => handleClostModal()}>
        <h2 className="modal-title">Chi tiết đơn hàng</h2>
      </div>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Descriptions>
            <Descriptions.Item label="Tên khách hàng">
              {data?.customer.name}
            </Descriptions.Item>
            <Descriptions.Item label="Điện thoại liên hệ">
              {data?.customer.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {data?.customer.email}
            </Descriptions.Item>
            <Descriptions.Item label="Thành tiền">
              {data?.total_price}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{addressName}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={24}></Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data?.order_details || []}
            bordered
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default Detail;
