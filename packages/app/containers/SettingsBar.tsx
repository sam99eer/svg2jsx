import { ChangeEvent } from 'react';
import styled from 'styled-components';

import color from '../styles/color';
import getStripes from '../utils/getStripes';
import getVariantColor, { VariantType } from '../utils/getVariantColor';

import Grid from '../components/Grid';
import GridCell from '../components/GridCell';
import Headings from '../components/Headings';
import Switch from '../components/Switch';

import IconCheckMark from '../icons/IconCheckMark';
import IconCross from '../icons/IconCross';
import IconGear from '../icons/IconGear';

interface ISettingsBar {
  memo: boolean;
  variant: VariantType;
  cleanupIDs: boolean;
  jsxSingleQuote: boolean;
  typescript: boolean;
  type: 'functional' | 'class';
  onChangeType(event: ChangeEvent<HTMLInputElement>): void;
  onChangeQuote(event: ChangeEvent<HTMLInputElement>): void;
  onChangeIDs(event: ChangeEvent<HTMLInputElement>): void;
  onChangeMemo(event: ChangeEvent<HTMLInputElement>): void;
  onChangeTypescript(event: ChangeEvent<HTMLInputElement>): void;
}

interface IStatus {
  variant: VariantType;
}

const Section = styled.section`
  padding: 10px 50px;
  border-bottom: 2px solid ${color.black};
  background: ${getStripes('left', 'grey')};
`;

const Status = styled.div<IStatus>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 40px;
  justify-content: center;
  transition: 300ms linear;
  border: 2px solid ${color.black};
  background: ${({ variant }) => getVariantColor(variant)};
`;

function SettingsBar({
  type,
  memo,
  variant,
  jsxSingleQuote,
  cleanupIDs,
  typescript,
  onChangeType,
  onChangeQuote,
  onChangeIDs,
  onChangeMemo,
  onChangeTypescript,
}: ISettingsBar) {
  const isFunctional = type === 'functional';

  return (
    <Section>
      <Grid columns="2fr 1fr 2fr">
        <GridCell>
          <Grid columns="auto auto auto auto auto" justify="flex-start" gap={20}>
            <Switch label="Functional" checked={isFunctional} onChange={onChangeType} />
            <Switch label="Remove IDs" checked={cleanupIDs} onChange={onChangeIDs} />
            <Switch label="Single quotes" checked={jsxSingleQuote} onChange={onChangeQuote} />
            <Switch label="Memo" checked={memo} onChange={onChangeMemo} />
            <Switch label="Typescript" checked={typescript} onChange={onChangeTypescript} disabled={!isFunctional} />
          </Grid>
        </GridCell>
        <GridCell>
          <Grid columns="1fr auto 1fr" gap={10}>
            <GridCell>
              <Headings primary="SVG" secondary="Input" />
            </GridCell>
            <GridCell>
              <Status variant={variant}>
                {variant === VariantType.CLEAR && <IconGear />}
                {variant === VariantType.SUCCESS && <IconCheckMark />}
                {variant === VariantType.ERROR && <IconCross />}
              </Status>
            </GridCell>
            <GridCell>
              <Headings primary="JSX" secondary="Output" inverse />
            </GridCell>
          </Grid>
        </GridCell>
      </Grid>
    </Section>
  );
}

export default SettingsBar;
