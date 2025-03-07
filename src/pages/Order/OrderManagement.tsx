import React, { useEffect, useState } from "react";
import { Table, Button, Tag, message } from "antd";
import orderServices from "../../utils/services/orderOnlineServices";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>();

  const handleIsOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderServices.getOrder({ page: 1, size: 10 });
      const data = response?.data?.data || [];
      console.log(data);

      // const ordersWithAddress = await Promise.all(
      //   data.map(async (order: any) => {
      //     try {
      //       if (order?.address) {
      //         const result = order.address.replace(/[\[\]]/g, "");
      //         const split = result.split(",");

      //         const address = await nameAdress(split[0], split[1]);
      //         console.log(address);
      //         return {
      //           ...order,
      //           address: address,
      //         };
      //       } else {
      //         return { ...order, address: "" };
      //       }
      //     } catch (error) {
      //       console.error(
      //         `Lỗi khi lấy địa chỉ cho đơn hàng ${order.id}:`,
      //         error
      //       );
      //       return {
      //         ...order,
      //         address: "Không thể lấy địa chỉ",
      //       };
      //     }
      //   })
      // );
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
      render: (customer: { name: string }) =>
        customer?.name || "Không xác định",
    },
    // {
    //   title: "Địa chỉ",
    //   dataIndex: "address",
    //   key: "address",
    //   // render: (coordinates: [number, number]) =>
    //   //   Array.isArray(coordinates) && coordinates.length === 2 ? (
    //   //     <AddressRenderer coordinates={coordinates} />
    //   //   ) : (
    //   //     "Không xác định"
    //   //   ),
    // },
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

  const handleOpenDetail = (record: any) => {
    console.log(record);
    setData(record);
    setIsOpen(true);
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "80%", width: "100%" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Quản lý đơn hàng
        </h1>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          bordered
          onRow={(record, index) => ({
            onClick: () => {
              console.log(index);
              handleOpenDetail(record);
            },
            style: {
              cursor: "pointer",
            },
          })}
        />
      </div>
      <Detail
        data={data}
        isOpen={isOpen}
        handleModal={handleIsOpen}
        setData={setData}
      />
    </div>
  );
}

const Detail = React.lazy(() => import("./Detail"));
