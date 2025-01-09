import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { message } from "antd";
import { authServices } from "../../utils/services/authService ";
// import { useDispatch } from "react-redux";
// import useAction from "../../redux/useActions";
import { useNavigate } from "react-router-dom";
import loginBack from "../../assets/images/login-v2.svg";
import Logo from "../../assets/images/snapedit_1702777474789.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { serverConfig } from "../../const/serverConfig";
export function Login() {
  const webcamRef = useRef<any>();
  const [isLoginWithFace, setIsLoginWithFace] = useState(false);

  const handleTest = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });

        // Tạo một đối tượng FormData và thêm file vào đó
        const formData = new FormData();
        formData.append("image", file);

        const params = {
          crop_size: 112,
          headpose: 0,
          yaw_thresh: 30,
          pitch_thresh: 30,
          skip_frame_ratio: 0,
          maxkeep: 20,
          crop_region: [],
          roi_list: [],
          conf_thres: 0.5,
          iou_thres: 0.6,
          img_size: 640,
          visualize: 0,
          facedb_name: "all_face",
          face_thresh: 0.5,
          limit: 5,
        };
        const params_str = JSON.stringify(params);
        // const url = `http://localhost:8080/api/v1/search-image`;
        const url = `${serverConfig.server}/api/v1/search-image`;

        axios
          .post(url, formData, {
            params: {
              config_param: params_str,
            },
            headers: {
              "Content-Type": "application/octet-stream", // Đặt kiểu content-type cho dữ liệu byteArray
            },
          })
          .then((response) => {
            if (!response?.data?.data) {
            } else {
              setIsLoginWithFace(false);
              // dispatch(actions.AuthActions.userInfo(response.data?.data));
              localStorage.setItem("role", response.data?.data.id_position);
              localStorage.setItem("username", response.data?.data.TaiKhoan);
              localStorage.setItem("name", response.data?.data.name);
              localStorage.setItem("token", response.data?.data.access_token);
              localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
              );
              navigate("/"); 
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    if (isLoginWithFace) {
      setInterval(async () => {
        handleTest();
      }, 100);
    }

    return () => {
      // clearInterval(intervalId);
      // setIsLoginWithFace(false);
    };
  }, [isLoginWithFace]);

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const dispatch = useDispatch();
  // const actions = useAction();

  const onFinish = async (value: any) => {
    try {
      const res = await authServices.login(value);
      if (res.status) {
        console.log("res.status", res.data.name);
        // dispatch(actions.AuthActions.userInfo(res.data));
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("permissions", res.data.permissions)
      } else {
        message.error(res.message);
      }
        console.log("đăng nhập thành côgn")
        navigate("/"); 
    } catch (err) {
      console.log(err);
      message.error("Đăng nhập thất bại");
    }
  };

  return (
    <div className="login">
      {contextHolder}
      <Row>
        <Col span={16}>
          <img
            src={loginBack}
            className="login-background"
            alt="htht"
            style={{ width: "90%" }}
          />
        </Col>
        <Col
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          span={8}
        >
          <img src={Logo} className="logo-login" alt="htht" height={200} />
          <div
            style={{
              fontSize: "25px",
              marginBottom: "1px",
              fontWeight: "600",
              fontFamily: "cursive",
            }}
          >
            {" "}
            ĐĂNG NHẬP WEB CAFFE
          </div>
          <div style={{ margin: "30px", width: "75%" }}>
            {/* {isLoginWithFace ? (
              <div style={{ height: "300px", width: "300px" }}>
                <div
                  className="appvide"
                  style={{ height: "300px", width: "300px" }}
                >
                  <Webcam height={300} width={300} ref={webcamRef} />
                </div>

                <Button
                  onClick={() => {
                    setIsLoginWithFace(false);
                  }}
                >
                  stop
                </Button>
                <Button onClick={handleTest}>Test</Button>
              </div>
            ) : ( */}
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  style={{ marginBottom: "7px" }}
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
                            throw new Error("Tên bài không hợp lệ !");
                          }
                        }
                      },
                    },
                  ]}
                >
                  <Input placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Mât khảu không được bỏ trống",
                    },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      style={{ width: "90%" }}
                      htmlType="submit"
                      type="primary"
                    >
                      Đăng nhập
                    </Button>

                    <FontAwesomeIcon
                      style={{
                        fontSize: "30px",
                        color: "#1677ff",
                        cursor: "pointer",
                      }}
                      icon={faFaceSmile}
                    />
                  </div>
                </Form.Item>
              </Form>
            {/* )} */}
          </div>
        </Col>
      </Row>
    </div>
  );
};
