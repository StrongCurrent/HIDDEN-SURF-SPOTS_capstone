import styled from "styled-components";

export const WeatherInfoWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const InfoItem = styled.div``;
