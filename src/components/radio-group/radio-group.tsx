import * as React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Col from 'react-bootstrap/esm/Col';
import './radio-group.scss';

interface IRadioGroupItem {
  id: string;
  label: string;
  value: string;
  defaultChecked: boolean;
}
interface IRadioGroupProps {
  controlId: string;
  groupLabel: string;
  name: string;
  items: IRadioGroupItem[];
  onChange: (value: string) => void;
  disabled: boolean;
}

export const RadioGroup = ({
  controlId,
  groupLabel,
  name,
  items,
  onChange,
  disabled,
}: IRadioGroupProps): JSX.Element => (
  <Form.Group controlId={controlId}>
    <Form.Label>{groupLabel}</Form.Label>
    <Col>
      {items.map((item) => (
        <Form.Check
          key={item.id}
          inline
          label={item.label}
          type="radio"
          value={item.value}
          name={name}
          defaultChecked={item.defaultChecked}
          id={item.id}
          onChange={() => onChange(item.value)}
          disabled={disabled}
        />
      ))}
    </Col>
  </Form.Group>
);
