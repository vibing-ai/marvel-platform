import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister, $getNearestNodeOfType, $findMatchingParent} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
  $createTextNode,
  $createRangeSelection,
  $setSelection,
} from 'lexical';
import {$createCodeNode, $isCodeNode} from '@lexical/code';
import {$setBlocksType} from '@lexical/selection';
import {$isHeadingNode, $isQuoteNode, $createHeadingNode, $createQuoteNode} from '@lexical/rich-text';
import {
  $isListNode, 
  ListNode, 
  $createListNode, 
  $createListItemNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  IconButton,
  Divider,
  Stack,
  Tooltip,
  Box,
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  Undo,
  Redo,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  Code,
  Title as TitleIcon,
  FormatListBulleted as BulletListIcon,
  FormatListNumbered as NumberedListIcon,
  FormatQuote as QuoteIcon,
  TextFormat as TextFormatIcon,
} from '@mui/icons-material';

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      // Update block type
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isHeadingNode(element)) {
          const tag = element.getTag();
          setBlockType(tag);
        } else if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const listType = parentList ? parentList.getListType() : element.getListType();
          setBlockType(listType);
        } else if ($isQuoteNode(element)) {
          setBlockType('quote');
        } else if ($isCodeNode(element)) {
          setBlockType('code');
        } else {
          setBlockType('paragraph');
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  // Format functions
  const formatParagraph = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        return;
      }
      
      const nodes = selection.getNodes();
      const firstNode = nodes[0];
      
      // Check for code block
      const parentCodeBlock = $findMatchingParent(
        firstNode,
        (node) => $isCodeNode(node)
      );
      
      // Check for quote
      const parentQuote = $findMatchingParent(
        firstNode,
        (node) => $isQuoteNode(node)
      );
      
      if (parentCodeBlock && $isCodeNode(parentCodeBlock)) {
        // Handle code block conversion
        const codeContent = parentCodeBlock.getTextContent();
        const lines = codeContent.split('\n');
        
        // Create a paragraph for each line
        const paragraphs = [];
        for (const line of lines) {
          if (line.trim() !== '' || paragraphs.length === 0) {
            const paragraph = $createParagraphNode();
            if (line.trim() !== '') {
              paragraph.append($createTextNode(line));
            }
            paragraphs.push(paragraph);
          }
        }
        
        // Make sure we have at least one paragraph
        if (paragraphs.length === 0) {
          paragraphs.push($createParagraphNode());
        }
        
        // Insert the first paragraph before the code block
        const firstParagraph = paragraphs[0];
        parentCodeBlock.insertBefore(firstParagraph);
        
        // Insert the rest of the paragraphs after the first one
        let prevNode = firstParagraph;
        for (let i = 1; i < paragraphs.length; i++) {
          prevNode.insertAfter(paragraphs[i]);
          prevNode = paragraphs[i];
        }
        
        // Now remove the code block after we've established new nodes
        parentCodeBlock.remove();
        
        // Create a selection that spans all the paragraphs
        if (paragraphs.length > 0) {
          const anchorNode = paragraphs[0].getFirstDescendant();
          const focusNode = paragraphs[paragraphs.length - 1].getLastDescendant();
          
          if (anchorNode && focusNode) {
            const selection = $createRangeSelection();
            selection.anchor.set(anchorNode.getKey(), 0, 'text');
            selection.focus.set(
              focusNode.getKey(), 
              focusNode.getTextContent().length,
              'text'
            );
            $setSelection(selection);
          } else {
            // Fallback if we can't create a proper selection
            firstParagraph.selectStart();
          }
        }
      } else if (parentQuote && $isQuoteNode(parentQuote)) {
        // Handle quote conversion
        const quoteContent = parentQuote.getTextContent();
        const lines = quoteContent.split('\n');
        
        // Create a paragraph for each line
        const paragraphs = [];
        for (const line of lines) {
          if (line.trim() !== '' || paragraphs.length === 0) {
            const paragraph = $createParagraphNode();
            if (line.trim() !== '') {
              paragraph.append($createTextNode(line));
            }
            paragraphs.push(paragraph);
          }
        }
        
        // Make sure we have at least one paragraph
        if (paragraphs.length === 0) {
          paragraphs.push($createParagraphNode());
        }
        
        // Insert the first paragraph before the quote
        const firstParagraph = paragraphs[0];
        parentQuote.insertBefore(firstParagraph);
        
        // Insert the rest of the paragraphs after the first one
        let prevNode = firstParagraph;
        for (let i = 1; i < paragraphs.length; i++) {
          prevNode.insertAfter(paragraphs[i]);
          prevNode = paragraphs[i];
        }
        
        // Remove the quote
        parentQuote.remove();
        
        // Create a selection that spans all the paragraphs
        if (paragraphs.length > 0) {
          const anchorNode = paragraphs[0].getFirstDescendant();
          const focusNode = paragraphs[paragraphs.length - 1].getLastDescendant();
          
          if (anchorNode && focusNode) {
            const selection = $createRangeSelection();
            selection.anchor.set(anchorNode.getKey(), 0, 'text');
            selection.focus.set(
              focusNode.getKey(), 
              focusNode.getTextContent().length,
              'text'
            );
            $setSelection(selection);
          } else {
            // Fallback if we can't create a proper selection
            firstParagraph.selectStart();
          }
        }
      } else {
        // Normal case, just convert to paragraph
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  }, [editor]);

  const formatHeading = useCallback((headingTag) => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection) {
        return;
      }
      if (!$isRangeSelection(selection) || selection.isCollapsed()) {
        $setBlocksType(selection, () => $createHeadingNode(headingTag));
      } else {
        const textContent = selection.getTextContent();
        const headingNode = $createHeadingNode(headingTag);
        selection.insertNodes([headingNode]);
        selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.insertRawText(textContent);
        }
      }
    });
  }, [editor]);

  const formatBulletList = useCallback(() => {
    const currentBlockType = blockType;
    if (currentBlockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  }, [editor, blockType, formatParagraph]);

  const formatNumberedList = useCallback(() => {
    const currentBlockType = blockType;
    if (currentBlockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  }, [editor, blockType, formatParagraph]);

  const formatQuote = useCallback(() => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection) {
        return;
      }
      if (!$isRangeSelection(selection) || selection.isCollapsed()) {
        $setBlocksType(selection, () => $createQuoteNode());
      } else {
        const textContent = selection.getTextContent();
        const quoteNode = $createQuoteNode();
        selection.insertNodes([quoteNode]);
        selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.insertRawText(textContent);
        }
      }
    });
  }, [editor]);

  const insertCodeBlock = useCallback(() => {
    editor.update(() => {
      let selection = $getSelection();
      if (!selection) {
        return;
      }
      if (!$isRangeSelection(selection) || selection.isCollapsed()) {
        $setBlocksType(selection, () => $createCodeNode());
      } else {
        const textContent = selection.getTextContent();
        const codeNode = $createCodeNode();
        selection.insertNodes([codeNode]);
        selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.insertRawText(textContent);
        }
      }
    });
  }, [editor]);

  return (
    <Stack 
      direction="row" 
      spacing={1} 
      alignItems="center" 
      ref={toolbarRef}
      className="editor-toolbar"
      sx={{
        p: 1,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        visibility: 'visible',
        flexWrap: 'wrap',
      }}
    >
      {/* Block Format Buttons */}
      <Tooltip title="Normal">
        <IconButton
          onClick={formatParagraph}
          color={blockType === 'paragraph' ? 'primary' : 'default'}
          size="small"
        >
          <TextFormatIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 1">
        <IconButton
          onClick={() => formatHeading('h1')}
          color={blockType === 'h1' ? 'primary' : 'default'}
          size="small"
        >
          <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>H1</Box>
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 2">
        <IconButton
          onClick={() => formatHeading('h2')}
          color={blockType === 'h2' ? 'primary' : 'default'}
          size="small"
        >
          <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>H2</Box>
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 3">
        <IconButton
          onClick={() => formatHeading('h3')}
          color={blockType === 'h3' ? 'primary' : 'default'}
          size="small"
        >
          <Box component="span" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>H3</Box>
        </IconButton>
      </Tooltip>

      <Tooltip title="Bullet List">
        <IconButton
          onClick={formatBulletList}
          color={blockType === 'bullet' ? 'primary' : 'default'}
          size="small"
        >
          <BulletListIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Numbered List">
        <IconButton
          onClick={formatNumberedList}
          color={blockType === 'number' ? 'primary' : 'default'}
          size="small"
        >
          <NumberedListIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Quote">
        <IconButton
          onClick={formatQuote}
          color={blockType === 'quote' ? 'primary' : 'default'}
          size="small"
        >
          <QuoteIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Code Block">
        <IconButton
          onClick={insertCodeBlock}
          color={blockType === 'code' ? 'primary' : 'default'}
          size="small"
        >
          <Code fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      <Tooltip title="Undo">
        <span>
          <IconButton
            disabled={!canUndo}
            onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
            size="small"
          >
            <Undo fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Redo">
        <span>
          <IconButton
            disabled={!canRedo}
            onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
            size="small"
          >
            <Redo fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      <Tooltip title="Bold">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
          color={isBold ? 'primary' : 'default'}
          size="small"
        >
          <FormatBold fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Italic">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
          color={isItalic ? 'primary' : 'default'}
          size="small"
        >
          <FormatItalic fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Underline">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
          color={isUnderline ? 'primary' : 'default'}
          size="small"
        >
          <FormatUnderlined fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Strikethrough">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
          color={isStrikethrough ? 'primary' : 'default'}
          size="small"
        >
          <StrikethroughS fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      <Tooltip title="Left Align">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
          size="small"
        >
          <FormatAlignLeft fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Center Align">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
          size="small"
        >
          <FormatAlignCenter fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Right Align">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
          size="small"
        >
          <FormatAlignRight fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Justify">
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
          size="small"
        >
          <FormatAlignJustify fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
