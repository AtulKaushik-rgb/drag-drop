import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SelectAndDrag from "./common/Drag&Drop/SelectOptions";

const App = () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        //Just pass options to the drag and drop.
        const data = await axios.get(
          "https://randomuser.me/api?page=1&results=10"
        );
        let names = data.data.results.map((obj) => obj.name);
        setOptions(names);

      } catch (err) {
        //  alert(err)
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <SelectAndDrag data={options} />
    </div>
  );
};

export default App;
