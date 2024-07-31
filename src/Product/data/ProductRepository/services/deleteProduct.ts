import productClient from "../client";

const deletePerson = async (productId: number): Promise<boolean> => {
  const response = await productClient.delete<boolean>(`/${productId}`);

  return response.data;
};

export default deletePerson;
