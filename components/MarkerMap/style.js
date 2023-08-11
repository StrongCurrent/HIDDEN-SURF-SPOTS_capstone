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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px 0px 10px;
  text-align: center;

  label {
    margin-right: 20px;
  }
`;

export const Longitude = styled.span`
  margin-right: 10px;
`;

export const Latitude = styled.span``;

export const Coordinates = styled.div`
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  width: 100%;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0px 5px;
  margin: 0;
  font-size: 11px;
  line-height: 18px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
