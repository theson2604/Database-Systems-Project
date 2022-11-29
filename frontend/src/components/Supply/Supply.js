import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { getSupplyType } from '../../service';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Suppy({selectSupply, setSelectSupply}) {
  const theme = useTheme();
  const [supply, setSupply] = useState()
  
  useEffect(() => {
    async function fetchSupply() {
      const sup = await getSupplyType();
      
      setSupply(sup)
    }
    if (!supply)
      fetchSupply()
  })
  const handleChange = (e) => {
    const {
      target: { value },
    } = e
    setSelectSupply(
      // On autofill we get a stringified value.
      value
    );
  };

  return (
    <div>
      <FormControl  sx={{ m: 1, width:500}}>
        <InputLabel id="demo-multiple-chip-label">Supply</InputLabel>
        <Select
          name="supply"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectSupply}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Supply" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.Supply_id} label={value.Supplyname} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {supply && supply.map((name, idx) => (
            <MenuItem
              key={idx}
              value={name}
              style={getStyles(name, supply, theme)}
            >
              {name.Supplyname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}