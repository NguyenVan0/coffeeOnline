import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { useCart } from '../../hooks/useCart';
import { mutate } from '../../utils/functions/mutator';
import axios from 'axios';
import { Container, Illustration, Info, InfoIcon, OrderInfo, Row } from './styles';
import deliveryImg from '../../assets/images/ilustracao-entregador.svg';

export function Order() {
  const { id } = useParams(); // Lấy tham số id từ URL (ví dụ: 33)
  const { order } = useCart();
  const address = localStorage.getItem('address'); // Lấy địa chỉ từ localStorage
  const parsedAddress = address ? JSON.parse(address) : null; // Parse chuỗi JSON địa chỉ
  const [resolvedAddress, setResolvedAddress] = useState<string>(''); // Địa chỉ được chuyển đổi

  // Hàm gọi API Nominatim để chuyển tọa độ thành địa chỉ
  const fetchAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'Accept-Language': 'vi', // Chọn ngôn ngữ tiếng Việt
          },
        }
      );
      if (response.data?.display_name) {
        setResolvedAddress(response.data.display_name); // Lưu địa chỉ trả về
      } else {
        setResolvedAddress('Không tìm thấy địa chỉ');
      }
    } catch (error) {
      console.error('Lỗi khi lấy địa chỉ từ tọa độ:', error);
      setResolvedAddress('Lỗi khi tìm địa chỉ');
    }
  };

  // Gọi hàm chuyển tọa độ thành địa chỉ khi parsedAddress thay đổi
  useEffect(() => {
    if (parsedAddress) {
      fetchAddressFromCoordinates(parsedAddress.lat, parsedAddress.lng);
    }
  }, [parsedAddress]);

  return (
    <main>
      <Container>
        <header>
          <h1>Uhu! Đơn hàng đã được xác nhận</h1>
          <p>Bây giờ chỉ cần chờ đợi, cà phê sẽ sớm được giao đến bạn</p>
        </header>

        <Row>
          <OrderInfo>
            <Info>
              <InfoIcon $variant="purple-700">
                <MapPin size={16} weight="fill" />
              </InfoIcon>

              <p>
                Giao hàng đến{' '}
                {resolvedAddress ? (
                  <>
                    <strong>{resolvedAddress}</strong>
                  </>
                ) : (
                  <strong>Đang xác định địa chỉ...</strong>
                )}
              </p>
            </Info>

            <Info>
              <InfoIcon $variant="yellow-500">
                <Timer size={16} weight="fill" />
              </InfoIcon>

              <p>
                Thời gian dự kiến giao hàng
                <br />
                <strong>20 phút - 30 phút</strong>
              </p>
            </Info>

            <Info>
              <InfoIcon $variant="yellow-800">
                <CurrencyDollar size={16} />
              </InfoIcon>

              <p>
                Thanh toán khi nhận hàng
                <br />
                {/* <strong>Thanh toán khi nhận hàng</strong> */}
              </p>
            </Info>
          </OrderInfo>

          <Illustration>
            <img
              src={deliveryImg}
              alt="Hình minh họa một người đàn ông mặc áo vàng, quần xanh lá và giày đen, đang lái một chiếc xe máy Vespa màu tím"
            />
          </Illustration>
        </Row>
      </Container>
    </main>
  );
}
