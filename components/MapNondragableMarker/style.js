import styled from "styled-components";

export const MapWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 60vh;
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
  padding: 10px;
  text-align: center;

  label {
    margin-right: 20px;
  }
`;