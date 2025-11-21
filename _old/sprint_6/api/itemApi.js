const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getProducts({ orderBy, page, pageSize, keyword } = {}) {
  const params = new URLSearchParams();

  if (orderBy) params.append("orderBy", orderBy);
  if (pageSize) params.append("take", pageSize.toString());
  if (page) params.append("skip", ((page - 1) * (pageSize || 10)).toString()); // pageSize가 없으면 기본값 10
  if (keyword) params.append("word", keyword);

  // 쿼리 파라미터 문자열로 변환
  const query = params.toString();
  console.log(query); // 디버깅을 위한 쿼리 출력

  try {
    const response = await fetch(`${API_BASE_URL}/products?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function addProduct(productData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("상품 등록 실패:", error);
    throw error;
  }
}
