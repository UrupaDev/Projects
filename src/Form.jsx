import React from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoidGV0aWFuYXVydXBhIiwiYSI6ImNsYno2cHExMjEzc3MzcHAzMDBlZmxjdDMifQ.Q_71YSKP_d-UYkCck5LQHg"; // Assuming you're using environment variables in a plain JavaScript setup

// Create constants to use in getIso()
const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";

// Define the getIso function that sets up the Isochrone API query and makes a fetch call
export async function getIso([lon, lat], profile, minutes) {
  const query = await fetch(
    `${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${MAPBOX_TOKEN}`,
    { method: "GET" }
  );
  const data = await query.json();
  return data;
}

// Define the Form component
export default function Form({ profile, setProfile, minutes, setMinutes }) {
  return (
    <div className="my24 mx24 py24 px24 bg-gray-faint round">
      <form
        id="params"
        onChange={event => {
          if (event.target.name === "profile") setProfile(event.target.value);
          else if (event.target.name === "minutes") setMinutes(event.target.value);
        }}
      >
        <h4 className="txt-m txt-bold mb6">Choose a travel mode:</h4>
        <div className="mb12 mr12 toggle-group align-center">
          <label className="toggle-container">
            <input
              name="profile"
              type="radio"
              value="walking"
              checked={profile === "walking"}
            />
            <div className="toggle toggle--active-null toggle--null">
              Walking
            </div>
          </label>
          <label className="toggle-container">
            <input
              name="profile"
              type="radio"
              value="cycling"
              checked={profile === "cycling"}
            />
            <div className="toggle toggle--active-null toggle--null">
              Cycling
            </div>
          </label>
          <label className="toggle-container">
            <input
              name="profile"
              type="radio"
              value="driving"
              checked={profile === "driving"}
            />
            <div className="toggle toggle--active-null toggle--null">
              Driving
            </div>
          </label>
        </div>
        <h4 className="txt-m txt-bold mb6">Travel time (minutes):</h4>
        <div className="mb12 mr12 toggle-group align-center">
          <input
            name="minutes"
            type="number"
            min="0"
            step="5"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
