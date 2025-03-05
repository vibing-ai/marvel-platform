'use client';

import React, { useState } from 'react';

import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Menu, MenuItem, TextField } from '@mui/material';
import { cn } from '@udecode/cn';
import { useEditorRef, useElement, useReadOnly } from '@udecode/plate/react';
import { Check } from 'lucide-react';

const languages = [
  { label: 'Auto', value: 'auto' },
  { label: 'Plain Text', value: 'plaintext' },
  { label: 'ABAP', value: 'abap' },
  { label: 'Agda', value: 'agda' },
  { label: 'Arduino', value: 'arduino' },
  { label: 'ASCII Art', value: 'ascii' },
  { label: 'Assembly', value: 'x86asm' },
  { label: 'Bash', value: 'bash' },
  { label: 'BASIC', value: 'basic' },
  { label: 'BNF', value: 'bnf' },
  { label: 'C', value: 'c' },
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Clojure', value: 'clojure' },
  { label: 'CoffeeScript', value: 'coffeescript' },
  { label: 'Coq', value: 'coq' },
  { label: 'CSS', value: 'css' },
  { label: 'Dart', value: 'dart' },
  { label: 'Dhall', value: 'dhall' },
  { label: 'Diff', value: 'diff' },
  { label: 'Docker', value: 'dockerfile' },
  { label: 'EBNF', value: 'ebnf' },
  { label: 'Elixir', value: 'elixir' },
  { label: 'Elm', value: 'elm' },
  { label: 'Erlang', value: 'erlang' },
  { label: 'F#', value: 'fsharp' },
  { label: 'Flow', value: 'flow' },
  { label: 'Fortran', value: 'fortran' },
  { label: 'Gherkin', value: 'gherkin' },
  { label: 'GLSL', value: 'glsl' },
  { label: 'Go', value: 'go' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'Groovy', value: 'groovy' },
  { label: 'Haskell', value: 'haskell' },
  { label: 'HCL', value: 'hcl' },
  { label: 'HTML', value: 'html' },
  { label: 'Idris', value: 'idris' },
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSON', value: 'json' },
  { label: 'Julia', value: 'julia' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'LaTeX', value: 'latex' },
  { label: 'Less', value: 'less' },
  { label: 'Lisp', value: 'lisp' },
  { label: 'LiveScript', value: 'livescript' },
  { label: 'LLVM IR', value: 'llvm' },
  { label: 'Lua', value: 'lua' },
  { label: 'Makefile', value: 'makefile' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'Markup', value: 'markup' },
  { label: 'MATLAB', value: 'matlab' },
  { label: 'Mathematica', value: 'mathematica' },
  { label: 'Mermaid', value: 'mermaid' },
  { label: 'Nix', value: 'nix' },
  { label: 'Notion Formula', value: 'notion' },
  { label: 'Objective-C', value: 'objectivec' },
  { label: 'OCaml', value: 'ocaml' },
  { label: 'Pascal', value: 'pascal' },
  { label: 'Perl', value: 'perl' },
  { label: 'PHP', value: 'php' },
  { label: 'PowerShell', value: 'powershell' },
  { label: 'Prolog', value: 'prolog' },
  { label: 'Protocol Buffers', value: 'protobuf' },
  { label: 'PureScript', value: 'purescript' },
  { label: 'Python', value: 'python' },
  { label: 'R', value: 'r' },
  { label: 'Racket', value: 'racket' },
  { label: 'Reason', value: 'reasonml' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Rust', value: 'rust' },
  { label: 'Sass', value: 'sass' },
  { label: 'Scala', value: 'scala' },
  { label: 'Scheme', value: 'scheme' },
  { label: 'SCSS', value: 'scss' },
  { label: 'Shell', value: 'shell' },
  { label: 'Smalltalk', value: 'smalltalk' },
  { label: 'Solidity', value: 'solidity' },
  { label: 'SQL', value: 'sql' },
  { label: 'Swift', value: 'swift' },
  { label: 'TOML', value: 'toml' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'VB.Net', value: 'vbnet' },
  { label: 'Verilog', value: 'verilog' },
  { label: 'VHDL', value: 'vhdl' },
  { label: 'Visual Basic', value: 'visualbasic' },
  { label: 'WebAssembly', value: 'wasm' },
  { label: 'XML', value: 'xml' },
  { label: 'YAML', value: 'yaml' },
];

export function CodeBlockCombobox() {
  const [anchorEl, setAnchorEl] = useState(null);
  const readOnly = useReadOnly();
  const editor = useEditorRef();
  const element = useElement();
  const value = element.lang || 'plaintext';
  const [searchText, setSearchText] = useState('');

  const filteredLanguages = languages.filter(
    (language) =>
      !searchText ||
      language.label.toLowerCase().includes(searchText.toLowerCase())
  );

  if (readOnly) return null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchText('');
  };

  const handleSelect = (value) => {
    editor.tf.setNodes(
      { lang: value },
      { at: element }
    );
    handleClose();
  };

  return (
    <div>
      <Button
        size="small"
        variant="text"
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        sx={{
          minWidth: 'auto',
          padding: '2px 8px',
          fontSize: '12px',
          color: 'text.secondary',
          textTransform: 'none',
        }}
      >
        {languages.find((language) => language.value === value)?.label ||
          'Plain Text'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 200,
            width: 180,
          },
        }}
      >
        <MenuItem sx={{ p: 0.5 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            autoFocus
          />
        </MenuItem>
        <div style={{ maxHeight: '160px', overflow: 'auto' }}>
          {filteredLanguages.map((language) => (
            <MenuItem
              key={language.value}
              onClick={() => handleSelect(language.value)}
              sx={{
                fontSize: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {language.label}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </div>
  );
}