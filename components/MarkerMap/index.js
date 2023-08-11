import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  MapContainer,
  MapMenu,
  MapWrapper,
  Coordinates,
  Longitude,
  Latitude,
} from "./style";

export default function MarkerMap({
  marker,
  setMarker,
  draggable = false,
  viewMode,
}) {
  const mapContainerRef = useRef(null);
  const markerRef = useRef();
  const [coordinates, setCoordinates] = useState({
    longitude: marker.longitude,
    latitude: marker.latitude,
  });

  const defaultStyle =
    viewMode === "create"
      ? "mapbox://styles/mapbox/outdoors-v12"
      : "mapbox://styles/mapbox/satellite-streets-v12";
  const [style, setStyle] = useState(defaultStyle);

  useEffect(() => {
    mapContainerRef.current.innerHTML = "";

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_GL;

    const zoomLevel = viewMode === "create" ? 0 : 13;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: style,
      center: [marker.longitude, marker.latitude],
      zoom: zoomLevel,
    });

    markerRef.current = new mapboxgl.Marker({
      draggable: draggable,
    })
      .setLngLat([marker.longitude, marker.latitude])
      .addTo(map);

    if (draggable) {
      markerRef.current.on("dragend", function () {
        const lngLat = markerRef.current.getLngLat();
        setMarker({
          longitude: lngLat.lng,
          latitude: lngLat.lat,
        });
        setCoordinates({
          longitude: lngLat.lng,
          latitude: lngLat.lat,
        });
      });
    }

    return () => map.remove();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, draggable, viewMode]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLngLat([marker.longitude, marker.latitude]);
    }
  }, [marker.latitude, marker.longitude]);

  const handleStyleChange = (event) => {
    setStyle("mapbox://styles/mapbox/" + event.target.value);
  };

  return (
    <MapWrapper>
      <MapContainer ref={mapContainerRef} aria-label="Map" />
      <Coordinates>
        <Longitude>Longitude: {coordinates.longitude.toFixed(4)}</Longitude>
        <Latitude>Latitude: {coordinates.latitude.toFixed(4)}</Latitude>
      </Coordinates>

      <MapMenu id="menu" aria-label="Map Style Selector">
        <label>
          <input
            type="radio"
            name="mapStyle"
            value="outdoors-v12"
            checked={style === "mapbox://styles/mapbox/outdoors-v12"}
            onChange={handleStyleChange}
            aria-label="Outdoors Style"
          />
          Outdoors
        </label>
        <label>
          <input
            type="radio"
            name="mapStyle"
            value="satellite-streets-v12"
            checked={style === "mapbox://styles/mapbox/satellite-streets-v12"}
            onChange={handleStyleChange}
            aria-label="Satellite Streets Style"
          />
          Satellite Streets
        </label>
      </MapMenu>
    </MapWrapper>
  );
}
