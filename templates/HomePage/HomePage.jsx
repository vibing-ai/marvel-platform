import { useState } from 'react';

import { Search } from '@mui/icons-material';
import { Box, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';

import TabButton from '@/components/TabButton';

import Star from '@/assets/svg/Star_3.svg';
import ImageURLs from '@/assets/urls';

import styles from './styles';

import disableFilters from '@/libs/constants/disableFilters';
import { ToolsListingContainer } from '@/tools';

import TextEditor from './TextEditor';

const TABS = ['All', 'Questions', 'Planning', 'Feedback'];

const HomePage = (props) => {
  const { data: unsortedData, loading } = props;
  const data = [...(unsortedData || [])].sort((a, b) => a.id - b.id);

  const [currentTab, setCurrentTab] = useState(TABS[0]);
  const [markdownContent, setMarkdownContent] = useState('');

  const markdown = `

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

\`\`\`javascript
let message = 'Hello world';
alert(message);
\`\`\`

## Tables
| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |
## Blocks of code


## Headers
# This is a Heading h1
## This is a Heading h2
### This is a Heading h3
#### This is a Heading h4
##### This is a Heading h5
###### This is a Heading h6
## Lists
### Unordered
- Item 1
- Item 2
    - Item 2a
    - Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b
## Blockquotes
> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
## Links
You may be using [Markdown Live Preview](https://markdownlivepreview.com/).
## Emphasis
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_
## Images
![This is an alt text.](https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "This is a sample image.")

## Inline code
This web site is using \`plate\`.
## GitHub Flavored Markdown
### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [ ] list syntax required (any unordered or ordered list supported)
### Strikethrough
~~This text is strikethrough~~
### Autolinks
Visit https://github.com automatically converts to a link
Email example@example.com also converts automatically
### Emoji
:smile: :heart:
`;

  // Set initial markdown content
  if (markdownContent === '') {
    setMarkdownContent(markdown);
  }

  const handleEditorChange = (markdown) => {
    setMarkdownContent(markdown);
  };

  const renderWelcomeBanner = () => {
    return (
      <Grid {...styles.bannerGridProps}>
        <Image
          src={ImageURLs.WelcomeBannerImg}
          alt="welcome_banner_img"
          {...styles.image1Props}
        />
        <Box {...styles.star1Props}>
          <Star />
        </Box>
        <Box {...styles.star2Props}>
          <Star />
        </Box>

        <Grid>
          <Typography {...styles.titleProps}>
            Hello! Welcome to Marvel AI Tools. 👋
          </Typography>
          <Typography {...styles.subtitleProps}>
            Made for{' '}
            <Typography {...styles.highlightTextProps}>educators. </Typography>
            Hello! I&apos;m Marvel AI, your AI teaching assistant. We are here
            to support you on your journey as a <b>teacher</b>, <b>mentor</b>,
            and <b>more</b>!
          </Typography>
        </Grid>

        <Image
          src={ImageURLs.CapsulesImg}
          alt="capsules_img"
          {...styles.image2Props}
        />
        <Box {...styles.star3Props}>
          <Star />
        </Box>
      </Grid>
    );
  };

  const renderFilters = () => {
    return (
      <Grid {...styles.filtersProps}>
        <Grid {...styles.tabsGrid}>
          {TABS.map((tab) => (
            <TabButton
              text={tab}
              isActive={currentTab === tab}
              setActive={setCurrentTab}
              key={tab}
            />
          ))}
        </Grid>

        <TextField {...styles.inputProps(<Search />)} />
      </Grid>
    );
  };

  const renderEditorSection = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%', mb: 5, minHeight: '700px' }}>
        <Box sx={{ width: '50%', pr: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Editor
          </Typography>
          <Box sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <TextEditor markdown={markdown} onChange={handleEditorChange} />
          </Box>
        </Box>
        <Box sx={{ width: '50%', pl: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Markdown Output
          </Typography>
          <textarea
            readOnly
            value={markdownContent}
            style={{
              width: '100%',
              flexGrow: 1,
              fontFamily: 'monospace',
              color: '#000000',
              backgroundColor: '#ffffff',
              whiteSpace: 'pre-wrap',
              padding: '16.5px 14px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRadius: '4px',
              resize: 'none',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderEditorSection()}
      {renderWelcomeBanner()}
      {!disableFilters && renderFilters()}{' '}
      <ToolsListingContainer
        data={data}
        loading={loading}
        category="Marvel Tools"
      />
    </Grid>
  );
};

export default HomePage;
