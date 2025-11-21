import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "../../components/UI/InputItem";
import TagInput from "../../components/UI/TagInput";
import { addProduct } from "../../api/itemApi";

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [images] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 중복 등록 막기 위해 tags 배열에 없는 것 확인하고 삽입
  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  // 유효성 검사 함수: 각각의 입력 필드에 대해 개별 유효성 검사를 수행
  const validateName = (value) => {
    if (value.length < 2 || value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        name: "2자 이상 10자 이내로 입력해주세요",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateDescription = (value) => {
    if (value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        description: "10자 이상 입력해주세요.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const validatePrice = (value) => {
    if (!/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, price: "숫자로 입력해주세요." }));
    } else {
      setErrors((prev) => ({ ...prev, price: undefined }));
    }
  };

  // 상품 등록 API 호출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).some((key) => errors[key])) {
      return;
    }

    const productData = {
      name,
      description,
      price: Number(price), // 숫자형으로 변환
      tags,
      images,
    };

    try {
      const result = await addProduct(productData); // API 호출
      console.log("상품 등록 성공:", result);
      navigate(`/items/${result.id}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button
            type="submit"
            disabled={!name || !description || !price || !tags.length}
          >
            등록
          </Button>
        </TitleSection>

        <InputSection>
          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder="상품명을 입력해 주세요"
            error={errors.name} // 에러 메시지 전달
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              validateDescription(e.target.value);
            }}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
            error={errors.description} // 에러 메시지 전달
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              validatePrice(e.target.value);
            }}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price} // 에러 메시지 전달
          />

          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        </InputSection>
      </form>
    </Container>
  );
}

export default AddItemPage;
