import { ChangeEvent } from 'react';
import styled from 'styled-components';

import color from '../styles/color';

import Text from './Text';

interface ISwitch {
  checked?: boolean;
  disabled?: boolean;
  label: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

interface IInput {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

interface IKnob {
  checked: boolean;
  disabled?: boolean;
}

interface ILabel {
  disabled?: boolean;
}

const Label = styled.label<ILabel>`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  text-transform: uppercase;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Bar = styled.div`
  width: 30px;
  margin: 0 0 0 10px;
  border-radius: 30px;
  background: ${color.black};
`;

const Input = styled.input<IInput>`
  left: -999em;
  visibility: hidden;
  position: absolute;
`;

const Knob = styled.div<IKnob>`
  margin: 2px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  transition: 150ms ease-in-out;
  transform: ${({ checked }) => (checked ? 'translateX(11px)' : 'none')};
  background: ${({ checked, disabled }) => (checked ? (disabled ? color.grey : color.green) : color.grey)};
`;

function Switch({ label, checked, disabled, onChange }: ISwitch) {
  return (
    <Label disabled={disabled}>
      <Text textColor="lightGrey" fontWeight="bold" size="tiny">
        {label}
      </Text>
      <Bar>
        <Knob checked={checked} disabled={disabled} />
      </Bar>
      <Input type="checkbox" checked={checked} onChange={disabled ? null : onChange} />
    </Label>
  );
}

Switch.defaultProps = {
  checked: true,
};

export default Switch;
