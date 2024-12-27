import React, { useState, useEffect, useContext } from "react";
import { storeContext } from "../store";
import {
  SelectLocation,
  SelectEnvironment,
  ServerList,
} from "./TestLocationFormComponent";
import "./TestLocationFormComponent/Styles/selectStyles.css";
import { FaQuestion } from "react-icons/fa";

interface LocationFormProps {
  locationData: {
    locationID: number | null;
    envID: number | null;
    hint?: string;
  };
  servers: { name: string }[];
  onChange: (data: Partial<LocationFormProps["locationData"]>) => void;
}

export const TestLocationForm: React.FC<LocationFormProps> = ({
  locationData,
  onChange,
}) => {
  const [inputText, setInputText] = useState("");

  const [servers, setServers] = useState<string[]>([]);
  const store = useContext(storeContext);

  useEffect(() => {
    const filteredServers = store.filteredServers(
      locationData.locationID,
      locationData.envID
    );
    setServers(filteredServers.map((el) => el.name));
  }, [locationData.locationID, locationData.envID, store]);

  const handleLocationChange = (locationID: number) => {
    onChange({ locationID });
  };

  const handleEnvChange = (envID: number) => {
    onChange({ envID });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange({ hint: inputText });
      setTimeout(() => {
        setInputText("");
      }, 1000);
    }
  };

  const formattedServers = servers.map((server) => ({ name: server }));
  return (
    <div className="form-container">
      <div className="form-container__select">
        <div className="form-container__section">
          <label>Локация</label>
          <SelectLocation onChange={handleLocationChange} />
        </div>
        <div className="form-container__section">
          <label>Среда</label>
          <SelectEnvironment
            locationID={locationData.locationID ?? null}
            onChange={handleEnvChange}
          />
        </div>
        <div className="form-container__section">
          <label>Серверы</label>
          <ServerList servers={formattedServers} />
        </div>        
      </div>
      <div className="form-container__input-row">
      <FaQuestion />
        <label>Подсказка</label>
        <input
          className="form-container__input"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          type="text"
          value={inputText}
          placeholder="Комментарий по локации"
        />
      </div>
    </div>
  );
};
