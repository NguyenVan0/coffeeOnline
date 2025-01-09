import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Dropdown, Menu, Modal, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RouterLinks } from '../const/RouterLinks';
import ModalTaiKhoan from './ModalTaiKoan';
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useDispatch, useSelector } from 'react-redux';
import { serverConfig } from '../const/serverConfig';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const userData = localStorage.getItem('name') || '';
  const webcamRef = useRef<Webcam>(null);
  const userInfo = useSelector((state: any) => state.auth.user_info);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalSetKhuonMat, setModalSetKhuonMat] = useState<boolean>(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleCallApi = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        const formData = new FormData();
        formData.append('image', file);

        const url = `${serverConfig.server}/api/v1/upsert-image`;

        axios
          .post(url, formData, {
            params: {
              name: userInfo?.name,
              id: userInfo?.id,
            },
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          })
          .then((response) => {
            if (response?.data?.status) {
              if (response?.data?.data?.status === 200) {
                message.success('Thêm khuôn mặt thành công');
                setMessageError(null);
              } else {
                if (response?.data?.data?.message.includes('skewed')) {
                  setMessageError('Mặt lệch quá');
                } else if (response?.data?.data?.message.includes('no')) {
                  setMessageError('Không tìm thấy khuôn mặt đâu');
                } else {
                  setMessageError('Chỉ 1 khuôn mặt trong 1 khung hình');
                }
              }
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const menu = (
    <Menu style={{ width: '200px' }}>
      <Menu.Item key="1" onClick={handleModal}>
        <span>
          <LogoutOutlined style={{ marginRight: '8px' }} />
          Tài khoản
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={RouterLinks.CHEF_PAGE}>
          <span>
            <UserOutlined style={{ marginRight: '8px' }} />
            Pha chế
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={RouterLinks.ORDER_PAGE}>
          <span>
            <DownOutlined style={{ marginRight: '8px' }} />
            Gọi món
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/login">
          <span>
            <LogoutOutlined style={{ marginRight: '8px' }} />
            Đăng xuất
          </span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'flex-end' }}>
      {contextHolder}
      <div style={{ marginRight: '20px' }}>
        <h4 style={{ marginTop: '2px' }}>{userData}</h4>
      </div>
      <Dropdown overlay={menu} trigger={['click']}>
        <a
          className="ant-dropdown-link"
          style={{ marginRight: '10px' }}
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined
            style={{
              fontSize: '25px',
              padding: '14px',
              marginRight: '-7px',
              color: 'black',
            }}
          />
          <DownOutlined />
        </a>
      </Dropdown>
      <ModalTaiKhoan setModalAddKhuonMat={setModalSetKhuonMat} isAdd={isModal} handleModal={handleModal} />
      <Modal
        open={modalSetKhuonMat}
        onCancel={() => {
          setModalSetKhuonMat(false);
          setMessageError(null);
        }}
        contentClassName="pt-0"
        autoFocus={false}
        width={400}
        footer={null}
      >
        <div className="appvide" style={{ height: '300px', width: '300px' }}>
          <Webcam height={300} width={300} ref={webcamRef} />
        </div>
        {messageError && <span style={{ color: 'red' }}>{messageError}</span>}
        <Button
          onClick={() => {
            setModalSetKhuonMat(false);
          }}
          danger
          style={{ marginRight: '7px' }}
        >
          Dừng lại
        </Button>
        <Button type="primary" onClick={handleCallApi}>
          Chụp khuôn mặt
        </Button>
      </Modal>
    </Header>
  );
};

export default AppHeader;
