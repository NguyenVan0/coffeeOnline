import React, { useState } from "react";
import { Form, Button, Input, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import registerBack from "../../assets/images/login-v2.svg";
import Logo from "../../assets/images/snapedit_1702777474789.png";
import { authServices } from "../../utils/services/authService ";

export function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (value: any) => {
    try {
      const payload = {
        username: value.username,
        name: value.name,
        password: value.password,
        id_role: "KH",
        email: value.email,
        phone_number: value.phone_number,
      };

      const res = await authServices.registerCustomer(payload);

      if (res.status === true) {
        message.success("Đăng ký thành công! Hãy đăng nhập.");
        navigate("/login"); // Điều hướng đến trang đăng nhập
      } else {
        message.error(res.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error(err);
      message.error("Đăng ký thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Row
        style={{
          width: "90%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          span={24}
        >
          <img
        src={Logo}
        className="logo-login"
        alt="Logo"
        style={{ height: "250px", width: "auto" }}
      />
      
          <div
            style={{
              fontSize: "25px",
              marginBottom: "10px",
              fontWeight: "600",
              fontFamily: "cursive",
            }}
          >
            ĐĂNG KÝ TÀI KHOẢN
          </div>
          <div style={{ margin: "30px", width: "100%", maxWidth: "400px" }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ width: "100%" }}
            >
              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Tên đăng nhập không được bỏ trống",
                  },
                  {
                    validator: async (_, value) => {
                      if (value) {
                        const regex = /^\s*$/;
                        if (regex.test(value)) {
                          throw new Error("Tên đăng nhập không hợp lệ!");
                        }
                      }
                    },
                  },
                ]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
  
              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Họ và tên không được bỏ trống",
                  },
                ]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
  
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được bỏ trống",
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
  
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email không được bỏ trống",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
  
              <Form.Item
                label="Số điện thoại"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được bỏ trống",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" type="number" />
              </Form.Item>
  
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#1677ff",
                    borderRadius: "5px",
                  }}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
  
}
