import styled from "styled-components";

export const MapWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 48vh;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const MapMenu = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px ;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  label:nth-child(2) {
    margin-right: 40px;
  }
`;

export const Longitude = styled.span`
  margin-right: 30px;
`;

export const Latitude = styled.span``;

export const Coordinates = styled.div`
  box-sizing: border-box;
  width: 100%;

  font-size: 0.8rem;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
