import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SortIcon } from "../../../assets/images/icons/ic_sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import { Link } from "react-router-dom";
import DropdownMenu from "../../../components/UI/DropdownMenu";
import PaginationBar from "../../../components/UI/PaginationBar";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 4;
  } else if (width < 1280) {
    // Tablet viewport
    return 6;
  } else {
    // Desktop viewport
    return 10;
  }
};

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState();
  const [word, setWord] = useState(""); // 검색어 상태 추가

  // 변경된 API 구조에 맞는 데이터 패치 함수
  const fetchSortedData = async ({ orderBy, page, pageSize, word }) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const products = await getProducts({
      orderBy,
      skip,
      take,
      word: word ? word : undefined,
    }); // 검색어 추가
    setItemList(products.data); // 변경된 API 응답에 맞게 data 사용
    setTotalPageNum(Math.ceil(products.count / pageSize)); // count 사용
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  const handleSearch = (e) => {
    setWord(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize, word });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, word]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="allItemsContainer">
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle">판매 중인 상품</h1>
        <Link to="/registration" className="loginLink button">
          상품 등록하기
        </Link>
      </div>

      <div className="allItemsSectionHeader">
        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={word}
            onChange={handleSearch} // 검색어 입력 핸들러 추가
          />
        </div>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </div>

      <div className="allItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AllItemsSection;
