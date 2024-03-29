import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function SelectButton(props) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    props.menuItems[event.target.value] === "None" 
      ? setSelectedValue("") 
      : setSelectedValue(props.menuItems[event.target.value]);
    props.onSelect(event.target.value);
  };

  return (
    <Box sx={{ width: 200 }}>
      <FormControl variant="filled" fullWidth>
        <InputLabel>{props.label}: {selectedValue} </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="sort-select"
          value=""
          label="Sort By"
          onChange={handleChange}
        >
          {Object.entries(props.menuItems).map(([criteria, label]) => (
            <MenuItem value={criteria}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
