import React, { useState, useRef, useCallback } from "react";
import { Card, AutoComplete, Typography, Space, Spin } from "antd";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import _ from "lodash";

const { Text } = Typography;

// Cấu hình icon cho marker trên bản đồ
(delete (L.Icon.Default.prototype as any)._getIconUrl);
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// MarkerPosition component: Cập nhật vị trí marker
interface MarkerPositionProps {
  position: LatLngLiteral;
}

const MarkerPosition: React.FC<MarkerPositionProps> = ({ position }) => {
  const map = useMap();

  React.useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return <Marker position={position} />;
};

// MapEvents component: Xử lý sự kiện click trên bản đồ
interface MapEventsProps {
  onMapClick: (latlng: LatLngLiteral) => void;
}

const MapEvents: React.FC<MapEventsProps> = ({ onMapClick }) => {
  const map = useMap();

  React.useEffect(() => {
    const handleClick = (e: { latlng: LatLngLiteral }) => {
      onMapClick(e.latlng);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);

  return null;
};

export const LocationPicker: React.FC = () => {

  const [position, setPosition] = useState<LatLngLiteral>({
    lat: 21.0285,
    lng: 105.8542,
  }); // Vị trí mặc định: Hà Nội
  const [address, setAddress] = useState<string>(""); // Địa chỉ hiển thị
  const [suggestions, setSuggestions] = useState<
    { value: string; label: string }[]
  >([]); // Gợi ý địa chỉ
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading
  const mapRef = useRef<any>(null);

  // Hàm tìm kiếm địa chỉ với debounce
  const debouncedSearchLocation = useCallback(
    _.debounce(async (value: string) => {
      if (!value) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&countrycodes=vn`,
          {
            headers: {
              "Accept-Language": "vi",
            },
          }
        );

        const suggestions = response.data.map((item: any) => ({
          value: `${item.lat},${item.lon}`,
          label: item.display_name,
        }));

        setSuggestions(suggestions);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm địa chỉ:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearch = (value: string) => {
    debouncedSearchLocation(value);
  };

  // Hàm lấy địa chỉ từ tọa độ
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "Accept-Language": "vi",
          },
        }
      );
      if (response.data?.display_name) {
        setAddress(response.data.display_name);
      } else {
        console.warn("Không tìm thấy địa chỉ phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ từ tọa độ:", error);
    }
  };

  // Xử lý khi chọn địa chỉ từ danh sách gợi ý
  const handleSelect = (
    value: string,
    option: { value: string; label: string }
  ) => {
    const [lat, lon] = value.split(",");
    const newPosition = {
      lat: parseFloat(lat),
      lng: parseFloat(lon),
    };

    setPosition(newPosition);
    setAddress(option.label);
  };

  // Xử lý khi click trên bản đồ
  const handleMapClick = async (newPosition: LatLngLiteral) => {
  localStorage.setItem("address", JSON.stringify(newPosition)); 
    setPosition(newPosition);
    await getAddressFromCoordinates(newPosition.lat, newPosition.lng);
  };

  return (
    <Card style={{ width: "100%", maxWidth: "800px" }}>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {/* Ô tìm kiếm địa chỉ */}
        <AutoComplete
          value={address}
          options={suggestions}
          onSearch={handleSearch}
          onSelect={handleSelect}
          onChange={(value) => setAddress(value)}
          placeholder="Nhập địa chỉ để tìm kiếm..."
          style={{ width: "100%" }}
          notFoundContent={
            loading ? <Spin size="small" /> : "Không tìm thấy kết quả"
          }
        />

        {/* Bản đồ hiển thị vị trí */}
        <div
          style={{
            height: 400,
            width: "100%",
            border: "1px solid #f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerPosition position={position} />
            <MapEvents onMapClick={handleMapClick} />
          </MapContainer>
        </div>

        {/* Hiển thị tọa độ và địa chỉ */}
        {position && (
          <Space direction="vertical">
            <Text type="secondary">
              Tọa độ: {position.lat}, {position.lng}
            </Text>
            <Text type="secondary">Địa chỉ: {address}</Text>
          </Space>
        )}
      </Space>
    </Card>
  );
};
