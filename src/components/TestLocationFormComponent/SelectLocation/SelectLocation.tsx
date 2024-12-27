import React, { useContext, useEffect } from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { observer } from "mobx-react-lite";
import { storeContext } from "../../../store";
import "../Styles/selectStyles.css";

interface SelectLocationProps {
  onChange: (locationID: number) => void;
}

const SelectLocation: React.FC<SelectLocationProps> = observer(
  ({ onChange }) => {
    const store = useContext(storeContext);
    useEffect(() => {
      store.fetchData();
    }, [store]);
    const handleChangeLocation = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const locationID = +event.target.value;
      store.setLocationID(locationID);
      onChange(locationID);
    };
    if (!store.isLoaded) return <div>Данных пока нет</div>;

    return (
      <>
        <div>
          <BsFillGeoAltFill style={{marginRight: "10px"}} />
          <select className="select" onChange={handleChangeLocation}>
            <option value="">Выберите локацию</option>
            {store.locations.map((location) => (
              <option key={location.locationID} value={location.locationID}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
);

export default SelectLocation;
