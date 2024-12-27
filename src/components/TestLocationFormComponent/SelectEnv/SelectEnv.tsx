import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { storeContext } from "../../../store";
import "../Styles/selectStyles.css";
import { IoIosLeaf } from "react-icons/io";

interface SelectEnvProps {
  locationID: number | null;
  onChange: (envID: number) => void;
}

const SelectEnvironment: React.FC<SelectEnvProps> = observer(({ onChange }) => {
  const store = useContext(storeContext);
  const handleChangeEnvironment = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const envID = +event.target.value;
    onChange(envID);
    store.setEnvID(envID)
  };

  return (
    <div>
      <IoIosLeaf style={{ marginRight: "10px" }} />
      <select
        className="select"
        onChange={handleChangeEnvironment}
        disabled={!store.filteredEnvs.length}
      >
        <option value="">Выберите среду</option>
        {store.filteredEnvs.map((env) => (
          <option key={env.envID} value={env.envID}>
            {env.name}
          </option>
        ))}
      </select>
    </div>
  );
});
export default SelectEnvironment;
