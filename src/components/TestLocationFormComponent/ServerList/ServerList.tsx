import { observer } from "mobx-react-lite";
import "../Styles/selectStyles.css";
import { FaServer } from "react-icons/fa";

interface ServerListProps {
  servers: { name: string }[];
}

const ServerList: React.FC<ServerListProps> = observer(({ servers }) => {

  const serversNames = servers.map((el) => el.name)
  return (
    <div>
      <FaServer style={{ marginRight: "10px" }} />
      <span>{serversNames.join(', ')}</span>
    </div>
  );
});

export default ServerList;
