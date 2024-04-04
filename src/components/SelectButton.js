import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

export default function SelectButton(props) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    props.menuItems[event.target.value] === "None"
      ? setSelectedValue("")
      : setSelectedValue(props.menuItems[event.target.value]);
    props.onSelect(event.target.value);
  };

  useEffect(() => {
    props.label !== "Sort By" && props.filters[props.label] !== null
      ? setSelectedValue(props.filters[props.label])
      : setSelectedValue("");

    if (props.label === "Sort By") {
      props.sorts === "none"
        ? setSelectedValue("")
        : setSelectedValue(props.menuItems[props.sorts]);
    }
  }, [props.filters, props.sorts]);

  return (
    <Box
      className="selectButton"
      sx={{ width: 200 }}
      aria-label="dropdown button"
    >
      <FormControl variant="filled" fullWidth size="small">
        <InputLabel htmlFor={`${props.id}-input-id`}>
          {props.label}: {selectedValue}
        </InputLabel>
        <Select
          inputProps={{ id: `${props.id}-input-id` }}
          value=""
          label="Sort By"
          sx={{ height: "50px" }}
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
