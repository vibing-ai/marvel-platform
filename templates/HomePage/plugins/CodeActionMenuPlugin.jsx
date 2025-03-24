/**
 * CodeActionMenuPlugin for Lexical Editor
 * This plugin adds a language label and copy button to code blocks
 */

import { $isCodeNode, getLanguageFriendlyName, normalizeCodeLang, CodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode } from 'lexical';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// MUI Components
import { 
  Menu, 
  MenuItem, 
  ListItemText
} from '@mui/material';

// List of supported languages
const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'jsx',
  'python',
  'java',
  'c',
  'cpp',
  'csharp',
  'rust',
  'go',
  'bash',
  'sql',
  'json',
  'css',
  'html',
  'markdown',
];

function CodeActionMenuContainer({ anchorElem }) {
  const [editor] = useLexicalComposerContext();
  const [lang, setLang] = useState('');
  const [isShown, setShown] = useState(false);
  const codeSetRef = useRef(new Set());
  const codeDOMNodeRef = useRef(null);
  
  // MUI Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [copySuccess, setCopySuccess] = useState(false);

  function getCodeDOMNode() {
    return codeDOMNodeRef.current;
  }

  // Handle mouse move to detect when hovering over code blocks
  const onMouseMove = (event) => {
    const target = event.target;
    if (!target || target.nodeType !== 1) return;

    const codeDOMNode = target.closest('code.editor-code');
    if (!codeDOMNode) {
      return;
    }

    codeDOMNodeRef.current = codeDOMNode;

    let codeNode = null;
    let _lang = '';

    editor.update(() => {
      const maybeCodeNode = $getNearestNodeFromDOMNode(codeDOMNode);

      if ($isCodeNode(maybeCodeNode)) {
        codeNode = maybeCodeNode;
        _lang = codeNode.getLanguage() || '';
      }
    });

    if (codeNode) {
      setLang(_lang);
      setShown(true);
    }
  };

  // Register for code node mutations to track code blocks
  useEffect(() => {
    const removeListener = editor.registerMutationListener(
      CodeNode,
      (mutations) => {
        editor.getEditorState().read(() => {
          for (const [key, type] of mutations) {
            switch (type) {
              case 'created':
                codeSetRef.current.add(key);
                break;
              case 'destroyed':
                codeSetRef.current.delete(key);
                break;
              default:
                break;
            }
          }
        });
      }
    );

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      setShown(false);
      document.removeEventListener('mousemove', onMouseMove);
      removeListener();
    };
  }, [editor]);

  // Handle language menu open
  const handleLanguageMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle language menu close
  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle language change
  const handleLanguageChange = (newLang) => {
    editor.update(() => {
      const codeDOMNode = getCodeDOMNode();
      if (!codeDOMNode) return;

      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);
      if ($isCodeNode(codeNode)) {
        codeNode.setLanguage(newLang);
      }
    });
    handleLanguageMenuClose();
  };

  // Copy code to clipboard with preserved line breaks
  const handleCopyCode = (codeBlock) => {
    if (!codeBlock) return;

    // Get the code content with preserved line breaks
    const codeLines = codeBlock.innerText.split('\n');
    const codeContent = codeLines.join('\n');
    
    navigator.clipboard.writeText(codeContent).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error('Could not copy code: ', err);
      }
    );
  };

  // Add language label and copy button to code blocks
  useEffect(() => {
    // Create a function to process a single code block
    const processCodeBlock = (codeBlock) => {
      if (!codeBlock) return;
      
      const parentBlock = codeBlock.parentElement;
      if (!parentBlock) return;
      
      // Set position relative on parent for absolute positioning of elements
      parentBlock.style.position = 'relative';
      
      // Check if language label already exists
      let langLabel = parentBlock.querySelector('.code-language-label');
      if (!langLabel) {
        // Create language label element
        langLabel = document.createElement('div');
        langLabel.className = 'code-language-label';
        langLabel.style.position = 'absolute';
        langLabel.style.bottom = '8px';
        langLabel.style.left = '8px';
        langLabel.style.fontSize = '12px';
        langLabel.style.padding = '2px 8px';
        langLabel.style.borderRadius = '4px';
        langLabel.style.backgroundColor = 'rgba(55, 71, 79, 0.8)';
        langLabel.style.color = 'rgba(255, 255, 255, 0.87)';
        langLabel.style.cursor = 'pointer';
        langLabel.style.zIndex = '5';
        langLabel.style.fontFamily = 'var(--fontStack-monospace)';
        langLabel.style.textTransform = 'lowercase';
        
        // Add click handler to open language menu
        langLabel.addEventListener('click', (e) => {
          codeDOMNodeRef.current = codeBlock;
          setAnchorEl(e.currentTarget);
        });
        
        // Add to code block
        parentBlock.appendChild(langLabel);
      }
      
      // Update language label text
      editor.update(() => {
        const codeNode = $getNearestNodeFromDOMNode(codeBlock);
        if ($isCodeNode(codeNode)) {
          const blockLang = codeNode.getLanguage() || '';
          const friendlyName = getLanguageFriendlyName(blockLang) || 'plain text';
          langLabel.textContent = friendlyName;
        } else {
          langLabel.textContent = 'plain text';
        }
      });
      
      // Check if copy button already exists
      let copyButton = parentBlock.querySelector('.code-copy-button');
      if (!copyButton) {
        // Create copy button container
        copyButton = document.createElement('div');
        copyButton.className = 'code-copy-button';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '8px';
        copyButton.style.right = '8px';
        copyButton.style.zIndex = '5';
        copyButton.style.cursor = 'pointer';
        copyButton.style.width = '24px';
        copyButton.style.height = '24px';
        copyButton.style.display = 'flex';
        copyButton.style.alignItems = 'center';
        copyButton.style.justifyContent = 'center';
        copyButton.style.borderRadius = '4px';
        copyButton.style.backgroundColor = 'rgba(55, 71, 79, 0.8)';
        copyButton.style.color = 'rgba(255, 255, 255, 0.87)';
        
        // Create copy icon
        const copyIcon = document.createElement('span');
        copyIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
        `;
        copyButton.appendChild(copyIcon);
        
        // Add click handler to copy code
        copyButton.addEventListener('click', () => {
          const codeLines = codeBlock.innerText.split('\n');
          const codeContent = codeLines.join('\n');
          
          navigator.clipboard.writeText(codeContent).then(
            () => {
              copyButton.style.backgroundColor = 'rgba(18, 209, 142, 0.8)';
              setTimeout(() => {
                copyButton.style.backgroundColor = 'rgba(55, 71, 79, 0.8)';
              }, 2000);
            },
            (err) => {
              console.error('Could not copy code: ', err);
            }
          );
        });
        
        // Add to code block
        parentBlock.appendChild(copyButton);
      }
    };

    // Function to find and process all code blocks
    const findAndProcessCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll('code.editor-code');
      codeBlocks.forEach(processCodeBlock);
    };

    // Process code blocks when editor state changes
    const removeUpdateListener = editor.registerUpdateListener(() => {
      // Use setTimeout to ensure the DOM has been updated
      setTimeout(findAndProcessCodeBlocks, 0);
    });

    // Initial processing
    setTimeout(findAndProcessCodeBlocks, 0);

    // Set up mutation observer to detect new code blocks
    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldProcess = true;
        }
      });
      
      if (shouldProcess) {
        setTimeout(findAndProcessCodeBlocks, 0);
      }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      observer.disconnect();
      removeUpdateListener();
    };
  }, [editor]);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: '180px',
          },
        }}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <MenuItem
            key={language}
            selected={language === lang}
            onClick={() => handleLanguageChange(language)}
            dense
          >
            <ListItemText primary={getLanguageFriendlyName(language)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default function CodeActionMenuPlugin({ anchorElem = document.body }) {
  return createPortal(
    <CodeActionMenuContainer anchorElem={anchorElem} />,
    anchorElem
  );
}
