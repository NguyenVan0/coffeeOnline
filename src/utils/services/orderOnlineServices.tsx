import createApiServices from "../createApiService";
const api = createApiServices();

const getOrder = (params: any) => {
  return api.makeAuthRequest({
    url: `/api/v1/online/order`,
    method: "GET",
    params: params,
  });
};

const createOrder = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/v1/online/order",
    method: "POST",
    data,
  });
};

const deleteOrder = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/v1/online/order/${Id}`,
    method: "DELETE",
  });
};

const updateOrder = (Id: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/v1/online/order/${Id}`,
    method: "PUT",
    data,
  });
};

// Gói các hàm vào đối tượng `orderServices`
const orderServices = {
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
};

export default orderServices;
