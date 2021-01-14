import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './selectOption.scss';

interface IOptions {
  [key: string]: string;
}

interface ISelectOptionProps {
  title: string;
  setCurrShowingData: (e: string | null) => void;
  options: IOptions;
  selectedKey?: string;
}

export const SelectOption = (props: ISelectOptionProps): JSX.Element => {
  const { title, selectedKey, setCurrShowingData, options } = props;
  const handleSelect = (e: string | null) => {
    setCurrShowingData(e);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle className="dropdown-toggle" key="info" variant="info" title={title}>
        {selectedKey ? options[selectedKey] : title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(options).map((key) => (
          <Dropdown.Item key={`dropdown-variants-${key}`} id={`dropdown-variants-${key}`} eventKey={key}>
            {options[key]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

SelectOption.defaultProps = {
  selectedKey: '',
};
