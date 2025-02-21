'use client';

import React, { useState } from 'react';

import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Menu, MenuItem, TextField } from '@mui/material';
import {
  useCodeBlockCombobox,
  useCodeBlockComboboxState,
} from '@udecode/plate-code-block/react';
import Prism from 'prismjs';

// Prism language imports
import 'prismjs/components/prism-antlr4.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cmake.js';
import 'prismjs/components/prism-coffeescript.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-csharp.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-dart.js';
import 'prismjs/components/prism-django.js';
import 'prismjs/components/prism-docker.js';
import 'prismjs/components/prism-ejs.js';
import 'prismjs/components/prism-erlang.js';
import 'prismjs/components/prism-git.js';
import 'prismjs/components/prism-go.js';
import 'prismjs/components/prism-graphql.js';
import 'prismjs/components/prism-groovy.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/components/prism-kotlin.js';
import 'prismjs/components/prism-latex.js';
import 'prismjs/components/prism-less.js';
import 'prismjs/components/prism-lua.js';
import 'prismjs/components/prism-makefile.js';
import 'prismjs/components/prism-markdown.js';
import 'prismjs/components/prism-matlab.js';
import 'prismjs/components/prism-mermaid.js';
import 'prismjs/components/prism-objectivec.js';
import 'prismjs/components/prism-perl.js';
import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-powershell.js';
import 'prismjs/components/prism-properties.js';
import 'prismjs/components/prism-protobuf.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-r.js';
import 'prismjs/components/prism-ruby.js';
import 'prismjs/components/prism-sass.js';
import 'prismjs/components/prism-scala.js';
import 'prismjs/components/prism-scheme.js';
import 'prismjs/components/prism-scss.js';
import 'prismjs/components/prism-sql.js';
import 'prismjs/components/prism-swift.js';
import 'prismjs/components/prism-tsx.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-wasm.js';
import 'prismjs/components/prism-yaml.js';

export { Prism };

const languages = [
  { label: 'Plain Text', value: 'text' },
  { label: 'Bash', value: 'bash' },
  { label: 'CSS', value: 'css' },
  { label: 'Git', value: 'git' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'HTML', value: 'html' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSON', value: 'json' },
  { label: 'JSX', value: 'jsx' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'SQL', value: 'sql' },
  { label: 'SVG', value: 'svg' },
  { label: 'TSX', value: 'tsx' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'WebAssembly', value: 'wasm' },
  { label: 'ANTLR4', value: 'antlr4' },
  { label: 'C', value: 'c' },
  { label: 'CMake', value: 'cmake' },
  { label: 'CoffeeScript', value: 'coffeescript' },
  { label: 'C#', value: 'csharp' },
  { label: 'Dart', value: 'dart' },
  { label: 'Django', value: 'django' },
  { label: 'Docker', value: 'docker' },
  { label: 'EJS', value: 'ejs' },
  { label: 'Erlang', value: 'erlang' },
  { label: 'Go', value: 'go' },
  { label: 'Groovy', value: 'groovy' },
  { label: 'Java', value: 'java' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'LaTeX', value: 'latex' },
  { label: 'Less', value: 'less' },
  { label: 'Lua', value: 'lua' },
  { label: 'Makefile', value: 'makefile' },
  { label: 'Markup', value: 'markup' },
  { label: 'MATLAB', value: 'matlab' },
  { label: 'Mermaid', value: 'mermaid' },
  { label: 'Objective-C', value: 'objectivec' },
  { label: 'Perl', value: 'perl' },
  { label: 'PHP', value: 'php' },
  { label: 'PowerShell', value: 'powershell' },
  { label: '.properties', value: 'properties' },
  { label: 'Protocol Buffers', value: 'protobuf' },
  { label: 'Python', value: 'python' },
  { label: 'R', value: 'r' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Sass (Sass)', value: 'sass' },
  { label: 'Scala', value: 'scala' },
  { label: 'Scheme', value: 'scheme' },
  { label: 'Sass (Scss)', value: 'scss' },
  { label: 'Shell', value: 'shell' },
  { label: 'Swift', value: 'swift' },
  { label: 'XML', value: 'xml' },
  { label: 'YAML', value: 'yaml' },
];

export function CodeBlockCombobox() {
  const state = useCodeBlockComboboxState();
  const { commandItemProps } = useCodeBlockCombobox(state);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  if (state.readOnly) return null;

  const filteredLanguages = languages.filter(
    (language) =>
      !searchText ||
      language.label.toLowerCase().includes(searchText.toLowerCase()) ||
      language.value.toLowerCase().includes(searchText.toLowerCase())
  );

  const currentLanguage =
    languages.find((language) => language.value === state.value)?.label ||
    languages[0].label;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setHighlightedIndex(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchText('');
    setHighlightedIndex(0);
  };

  const handleSelect = (value) => {
    if (!value) return;
    commandItemProps.onSelect(value);
    handleClose();
  };

  const handleMenuItemClick = (value) => {
    handleSelect(value);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'Enter' && filteredLanguages.length > 0) {
      e.preventDefault();
      handleSelect(filteredLanguages[highlightedIndex].value);
      setAnchorEl(null);
    }
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
        {currentLanguage}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 200,
            width: 180,
            '& .MuiMenuItem-root': {
              py: 0.5,
              px: 1,
              minHeight: 'auto',
            },
          },
        }}
        MenuListProps={{
          autoFocusItem: false,
          disablePadding: true,
        }}
      >
        <section role="search" aria-label="Code language search" tabIndex="-1">
          <MenuItem sx={{ p: 0.5 }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              fullWidth
              autoFocus
              onClick={(e) => e.stopPropagation()}
              inputProps={{
                style: {
                  padding: '2px 8px',
                  fontSize: '12px',
                  height: '1.5rem',
                },
              }}
            />
          </MenuItem>
        </section>
        <div style={{ maxHeight: '160px', overflow: 'auto' }}>
          {filteredLanguages.map((language, index) => (
            <MenuItem
              key={language.value}
              onClick={() => handleMenuItemClick(language.value)}
              selected={highlightedIndex === index}
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
