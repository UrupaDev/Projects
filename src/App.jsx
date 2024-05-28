import { giraffeState, rpc } from "@gi-nx/iframe-sdk";
import { useGiraffeState } from "@gi-nx/iframe-sdk-react";
import union from "@turf/union";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Form, { getIso } from "./Form";

const layerName = "isochrone-temp";

const updateMap = debounce(
  async (points, minutes, profile) => {
    const fcs = await Promise.all(
      points.map(f => {
        const [lon, lat] = f.geometry.coordinates;
        return getIso([lon, lat], profile, +minutes);
      })
    );

    let combined;
    if (fcs.length === 0) {
      combined = {
        type: "FeatureCollection",
        features: [],
      };
    } else {
      combined = fcs[0];
      fcs.slice(1).forEach(fc => {
        combined.features = combined.features.map(f =>
          union(f, fc.features[0])
        );
      });
    }

    rpc.invoke("updateTempLayerGeoJSON", [layerName, combined]);
    return combined;
  },
  500,
  { leading: true, trailing: true, maxWait: 500 }
);

function App() {
  const bakedSections = useGiraffeState("bakedSections");
  const [profile, setProfile] = useState("cycling");
  const [minutes, setMinutes] = useState("10");
  const [lastResult, setLastResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const isoPoints = bakedSections.features.filter(
    f => f.geometry.type === "Point" && f.properties?.isochrone
  );

  useEffect(() => {
    updateMap(isoPoints, minutes, profile).then(setLastResult);
  }, [bakedSections, minutes, profile]);

  const addPoint = useCallback(() => {
    rpc.invoke("createRawSection", [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: giraffeState.get("mapView").center,
        },
        properties: {
          isochrone: true,
          usage: "Pin",
          marker: {
            kind: "text",
            value: {
              scale: 0.65,
              shape: "circle",
              backgroundColor: "#E5F2FD",
              borderColor: "#041178",
              shapeSize: 40,
              borderWidth: 3,
              text: "",
              textSize: 30,
              onTop: true,
              renderMode: "screen",
              stick: false,
              stickHeight: 0,
              anchor: "bottom",
            },
          },
        },
      },
    ]);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px" }}>Isochrone</h1>
      {isoPoints.length === 0 && (
        <>
          <br />
          <p>
            Please add a point to the map with property{" "}
            <code>isochrone: true</code>.
          </p>
          <br />
          <p style={{ textDecoration: "underline" }} onClick={addPoint}>
            OR click here to add one
          </p>
        </>
      )}
      {isoPoints.length > 0 && (
        <Form
          minutes={minutes}
          setMinutes={setMinutes}
          profile={profile}
          setProfile={setProfile}
        />
      )}
      <button
        className={`w-full text-center text-white font-bold py-2 px-4 rounded ${
          saving ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
        }`}
        disabled={saving}
        onClick={() => {
          setSaving(true);
          rpc
            .invoke(
              "updateGeoJSONLayerContents",
              [`${profile} ${minutes}min isochrone`, lastResult],
              { timeout: 10000 }
            )
            .then(r => {
              // console.log({ r });
            })
            .catch(e => {
              console.error({ e });
              window.alert(`'iframe sdk err: ', ${e.message}`);
            })
            .finally(() => setSaving(false));
        }}
      >
        {saving ? "Saving..." : "Save result to permanent layer"}
      </button>
    </div>
  );
}

export default App;