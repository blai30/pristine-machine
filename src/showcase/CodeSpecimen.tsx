import { CodeBlock, syntax } from '@/components'
import type { SyntaxKind } from '@/components'

/** Wrap a token in its syntax color. */
function s(kind: SyntaxKind, text: string) {
  return <span className={syntax[kind]}>{text}</span>
}

const lines = [
  <>{s('comment', '// A squared, plum-accented action')}</>,
  <></>,
  <>
    {s('keyword', 'import')} {s('punctuation', '{')} {s('plain', 'Button')} {s('punctuation', '}')}{' '}
    {s('keyword', 'from')} {s('string', "'@pristine/ui'")}
  </>,
  <></>,
  <>
    {s('keyword', 'export')} {s('keyword', 'function')} {s('func', 'SaveBar')}
    {s('punctuation', '({')} {s('plain', 'saving')} {s('punctuation', '=')} {s('number', 'false')}{' '}
    {s('punctuation', '})')} {s('punctuation', '{')}
  </>,
  <>
    {'  '}
    {s('keyword', 'const')} {s('plain', 'label')} {s('punctuation', '=')} {s('plain', 'saving')}{' '}
    {s('punctuation', '?')} {s('string', "'Saving…'")} {s('punctuation', ':')}{' '}
    {s('string', "'Save changes'")}
  </>,
  <></>,
  <>
    {'  '}
    {s('keyword', 'return')} {s('punctuation', '(')}
  </>,
  <>
    {'    '}
    {s('punctuation', '<')}
    {s('func', 'Button')} {s('property', 'variant')}
    {s('punctuation', '=')}
    {s('string', '"primary"')} {s('property', 'disabled')}
    {s('punctuation', '={')}
    {s('plain', 'saving')}
    {s('punctuation', '}>')}
  </>,
  <>
    {'      '}
    {s('punctuation', '{')}
    {s('plain', 'label')}
    {s('punctuation', '}')}
  </>,
  <>
    {'    '}
    {s('punctuation', '</')}
    {s('func', 'Button')}
    {s('punctuation', '>')}
  </>,
  <>
    {'  '}
    {s('punctuation', ')')}
  </>,
  <>{s('punctuation', '}')}</>,
]

export function CodeSpecimen() {
  return <CodeBlock filename="save-bar.tsx" lang="tsx" lines={lines} />
}
