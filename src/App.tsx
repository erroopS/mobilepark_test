import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { TestLocationForm } from "./components/TestLocationForm";
import { PiTestTubeFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { storeContext } from "./store";

interface TestLocationState {
  locationID: number | null;
  envID: number | null;
  hint: string;
}

const TestLocationsList: React.FC = observer(() => {
  const [locationsList, setLocationsList] = useState<TestLocationState[]>([
    { locationID: null, envID: null, hint: "" },
  ]);
  const store = useContext(storeContext);

  const handleChange = (index: number, data: Partial<TestLocationState>) => {
    setLocationsList((prevList) =>
      prevList.map((item, i) => (i === index ? { ...item, ...data } : item))
    );
  };

  const handleDelete = (index: number) => {
    const updatedLocationsList = locationsList.filter((_, i) => i !== index);
    setLocationsList(updatedLocationsList);
  };

  const handleAddLocation = () => {
    store.resetFilteredServers()
    setLocationsList([
      ...locationsList,
      { locationID: null, envID: null, hint: "" },
    ]);
  };

  return (
    <>
      <div className="form-container">
        {locationsList.map((location, index) => (
          <div className="container_items" key={`location-${index}`}>
            <div className="container_header">
              <PiTestTubeFill
                style={{ fontSize: "35px", marginRight: "10px" }}
              />
              <h2>{`Тестовая локация ${index + 1}`}</h2>
              <RiDeleteBin6Line
                className="container__delete-button"
                onClick={() => handleDelete(index)}
              />
            </div>
            <TestLocationForm
              locationData={location}
              onChange={(data) => handleChange(index, data)}
              servers={store.filteredServers(
                location.locationID,
                location.envID
              )}
            />
          </div>
        ))}
      </div>
      <button onClick={handleAddLocation}>Добавить тестовую локацию</button>
      <button
        onClick={() => {
          console.log(locationsList);
        }}
      >
        Вывести результат в консоль
      </button>
    </>
  );
});

export default function App() {
  return (
    <div className="App">
      <TestLocationsList />
    </div>
  );
}
