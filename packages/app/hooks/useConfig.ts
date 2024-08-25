import { ConfigType } from '@svg2jsx/transform';
import { ChangeEvent } from 'react';

import useSetState from './useSetState';

export default function useConfig() {
  const [config, setConfig] = useSetState<ConfigType>({
    memo: true,
    cleanupIDs: true,
    jsxSingleQuote: true,
    type: 'functional',
    typescript: true,
  });

  function setQuote({ target }: ChangeEvent<HTMLInputElement>): void {
    setConfig({
      jsxSingleQuote: target.checked,
    });
  }

  function setType({ target }: ChangeEvent<HTMLInputElement>): void {
    setConfig({
      type: target.checked ? 'functional' : 'class',
    });
  }

  function setMemo({ target }: ChangeEvent<HTMLInputElement>): void {
    setConfig({
      memo: target.checked,
    });
  }

  function setIDs({ target }: ChangeEvent<HTMLInputElement>): void {
    setConfig({
      cleanupIDs: target.checked,
    });
  }

  function setTypescript({ target }: ChangeEvent<HTMLInputElement>): void {
    setConfig({
      typescript: target.checked,
    });
  }

  return {
    config,
    setQuote,
    setType,
    setIDs,
    setMemo,
    setTypescript,
  };
}
