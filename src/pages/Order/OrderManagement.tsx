import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Input,
  Card,
  Modal,
  Form,
  Row,
  Col,
  message,
} from "antd";
import axios from "axios";
import orderServices from "../../utils/services/orderOnlineServices";
import dayjs from "dayjs";

interface Order {
  id: number;
  customer: {
    name: string;
  };
  address: [number, number];
  total_price: number;
  status: number;
  createdAt: string;
}

export function OrderManagement() {
  const [form] = Form.useForm();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderServices.getOrder({ page: 1, size: 10 });
      const data = response?.data?.data || [];
      setOrders(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      message.error("Không thể lấy thông tin đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      const response = await orderServices.deleteOrder(orderId.toString());
      if (response.status === 200) {
        message.success("Hủy đơn hàng thành công!");
        fetchOrders();
      } else {
        message.error("Không thể hủy đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      message.error("Đã xảy ra lỗi khi hủy đơn hàng.");
    }
  };

  const getAddressFromCoordinates = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      return response.data?.display_name || "Không xác định";
    } catch (error) {
      console.error("Lỗi khi chuyển tọa độ thành địa chỉ:", error);
      return "Không xác định";
    }
  };

  const AddressRenderer: React.FC<{ coordinates: [number, number] }> = ({
    coordinates,
  }) => {
    const [address, setAddress] = useState<string>("Đang xử lý...");

    useEffect(() => {
      const fetchAddress = async () => {
        if (Array.isArray(coordinates) && coordinates.length === 2) {
          const [lat, lng] = coordinates;
          const resolvedAddress = await getAddressFromCoordinates(lat, lng);
          setAddress(resolvedAddress);
        } else {
          setAddress("Không xác định");
        }
      };

      fetchAddress();
    }, [coordinates]);

    return <span>{address}</span>;
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer: { name: string }) => customer?.name || "Không xác định",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (coordinates: [number, number]) =>
        Array.isArray(coordinates) && coordinates.length === 2 ? (
          <AddressRenderer coordinates={coordinates} />
        ) : (
          "Không xác định"
        ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        let statusText = "";
        let color = "";

        switch (status) {
          case 1:
            statusText = "Chờ xác nhận";
            color = "orange";
            break;
          case 0:
            statusText = "Đang giao";
            color = "blue";
            break;
          case 3:
            statusText = "Đã giao";
            color = "green";
            break;
          default:
            statusText = "Không xác định";
            color = "gray";
        }

        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: Order) => (
        <Button
          type="primary"
          danger
          onClick={() => handleCancelOrder(record.id)}
          disabled={record.status !== 1} // Chỉ cho phép hủy đơn hàng "Chờ xác nhận"
        >
          Hủy
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
    <div style={{ maxWidth: '80%', width: '100%' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Quản lý đơn hàng</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  </div>  
  );
};

