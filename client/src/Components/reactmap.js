import React, { useState } from "react";
import ReactMapGL, {
  Layer,
  Source,
  LinearInterpolator,
  WebMercatorViewport,
} from "react-map-gl";
import { styleLayer } from "./map-style";
import API from "../utils/API.js";
import bbox from "@turf/bbox";
import mapboxgl from "mapbox-gl"

mapboxgl.workerClass = require('mapbox-gl/dist/mapbox-gl-csp-worker').default;

function Map( { articleSet, changeDisplayState, setCurrentCountry, date}) {
  const [viewport, setViewport] = useState({
    latitude: 37.7406,
    longitude: -122.4217,
    width: "100vw",
    height: "100vh",
    zoom: 2,
    minZoom: 2,
  });

const handleCountrySel = function (e) {
    
    changeDisplayState(true);
    
    var countryName = e.features[0].properties.NAME;

    if (countryName === undefined) {
      return;
    }
    
    setCurrentCountry(countryName);

    // console.log("you clicked on ===>", countryName);

    API.newsArticles(countryName, date).then(function (res) {
      let data = res.data.articles;
      articleSet(data);
    });

    const feature = e.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      // construct a viewport instance from the current state
      const vp = new WebMercatorViewport(viewport);
      // console.log("WebMercatorViewport", vp);
      const { longitude, latitude, zoom } = vp.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 40,
        }
      );

      setViewport(
        {
          ...viewport,
          longitude,
          latitude,
          zoom,
          transitionInterpolator: new LinearInterpolator({
            around: [e.offsetCenter.x, e.offsetCenter.y],
          }),
          transitionDuration: 1000,
        },
        []
      );
    }
  };

  return (
    <div className="main">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic3BlbnJhZCIsImEiOiJja2x3bWZoc2EwMGFwMnVxa3NueXZmMHlnIn0.m_FPTC7C4JhyOtzp2KwcKg"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        onClick={handleCountrySel}>
          
        <Source type="vector" url="mapbox://byfrost-articles.74qv0xp0">
          <Layer {...styleLayer} />
        </Source>
      </ReactMapGL>
    </div>
  );
}

export default Map;
