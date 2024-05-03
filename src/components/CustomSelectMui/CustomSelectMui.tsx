import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styled from 'styled-components';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const StyledAutocomplete = styled(Autocomplete)`
  & .MuiFormLabel-root {
    color: #fff;

    &.Mui-focused {
      color: inherit;
    }
  }

  & .MuiInputBase-root {
    background-color: #101827;

    & .MuiChip-label {
      color: #fff;
      font-weight: 700;
    }

    & input {
      color: #fff;
    }

    & filedset {
      border-color: #fff !important;
    }

    & .MuiSvgIcon-root {
      color: #fff;
    }
  }

  & fieldset {
    border-color: #fff !important;
  }
`;

const CustomSelectMui = ({
  title,
  type,
  id,
  data,
  filterList,
  setFilterList,
}: {
  title: string;
  type: string;
  id: string;
  filterList: any;
  data: any;
  setFilterList: any;
}) => {
  const updateFilters = (values: any) => {
    let copyedFilters = { ...filterList };
    if (copyedFilters) {
      copyedFilters[type].map((item: any) => {
        item.checked = false;
      });
    }

    values.map((elem: any) => {
      let indexElem = copyedFilters[type].findIndex(
        (item: any) => item.title === elem.title
      );
      if (indexElem !== -1) {
        copyedFilters[type][indexElem].checked = true;
      }
    });
    setFilterList(copyedFilters);
  };

  return (
    <StyledAutocomplete
      multiple
      id={id}
      onChange={(event: any, newValue: any) => {
        console.log(newValue);
        updateFilters(newValue);
      }}
      noOptionsText="Ничего не найдено"
      options={data}
      disableCloseOnSelect
      limitTags={4}
      getOptionLabel={(option: any) =>
        String(option.ruName ? option.ruName : option.title)
      }
      renderOption={(props, option: any, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.ruName ? option.ruName : option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={title} placeholder={title} />
      )}
    />
  );
};

export default CustomSelectMui;
