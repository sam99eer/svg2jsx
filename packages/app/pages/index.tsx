import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import useConfig from '../hooks/useConfig';
import useEditor from '../hooks/useEditor';
import useTransformer from '../hooks/useTransformer';

import Loader from '../components/Loader';
import NavBar from '../containers/NavBar';
import SettingsBar from '../containers/SettingsBar';
import Layout from '../layouts/Layout';

const Playground = dynamic(() => import('../containers/Playground'), {
  ssr: false,
  loading: Loader,
});

function HomePage() {
  const { config, setQuote, setType, setMemo, setIDs, setTypescript } = useConfig();
  const { editor, setSvg, setFile } = useEditor();
  const { transformer, transform, clear } = useTransformer();

  useEffect(() => {
    if (editor.svg) {
      transform(editor.svg, config);
    } else {
      clear();
    }
  }, [config.jsxSingleQuote, config.type, config.cleanupIDs, config.memo, config.typescript, editor.svg]);

  return (
    <Layout>
      <NavBar variant={transformer.variant} />

      <SettingsBar
        type={config.type}
        jsxSingleQuote={config.jsxSingleQuote}
        memo={config.memo}
        cleanupIDs={config.cleanupIDs}
        typescript={config.typescript}
        variant={transformer.variant}
        onChangeType={setType}
        onChangeQuote={setQuote}
        onChangeIDs={setIDs}
        onChangeMemo={setMemo}
        onChangeTypescript={setTypescript}
      />

      <Playground svg={editor.svg} jsx={transformer.jsx} onDrop={setFile} onChange={setSvg} />
    </Layout>
  );
}

export default HomePage;
