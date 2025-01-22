# Document Editor Technical Specifications

## 1. Overview
Implementation of a rich text editor using Plate.js to enable users to edit AI-generated tool outputs. The system will automatically convert tool outputs from JSON to Markdown format and provide version history tracking (limited to 15 revisions).

## 2. Current Workflow

1. Tool Generation & Display
   - User selects a tool (e.g., Quiz Generator) and provides input
   - Tool generates output in JSON format
   - Output is saved to Firestore in the `toolSessions` collection
   - Each tool has its own display component: (These components will be replaced with the new editor)
     - QuizResponse: Renders quiz questions and choices
     - FlashCardList: Shows flashcard front and back
     - WorksheetResponse: Displays questions and answers
     - SyllabusResponse: Shows course outline
       

2. Current Data Structure
   ```javascript
   // toolSessions document
   {
     "sessionId": string,
     "userId": string,
     "toolId": string,
     "topic": string,
     "createdAt": timestamp,
     "response": Object        // Original JSON response
   }
   ```

## 3. Proposed Workflow

1. Content Generation & Storage
   - Tool generates output in JSON format
   - System converts JSON to Markdown based on tool type:
     - Quiz: Questions as headers, choices as lists
     - Flashcards: Front/back as sections with dividers
     - Worksheet: Questions as numbered lists
     - Syllabus: Hierarchical headers with nested lists
   - Both formats are stored in Firestore:
     - Original JSON under `response`
     - Markdown under `editorState.markdownContent`

2. Editor Interaction
   - User clicks on generated output
   - Plate.js editor opens with markdown content
   - Content is formatted based on tool type:
     - Quiz: Each question in its own section
     - Flashcards: Clear visual separation between cards
     - Worksheet: Organized question-answer pairs
     - Syllabus: Proper heading hierarchy
   - User can make changes with rich text controls
   - Changes are auto-saved (every 2 seconds after changes detected)
   - Auto-save only triggers if content has changed
   - Last 15 revisions are saved

3. Version Control
   - System keeps last 15 revisions
   - Users can view edit history
   - Users can restore previous versions
   - Undo/redo functionality available
   - Oldest revision is removed when limit is reached

4. Export Options
   - Export as PDF
   - Export as plain text
   - Export as HTML

## 4. Plate.js Implementation Guide

### Core Setup
1. Install Dependencies
   ```bash
   npm install @udecode/plate
   ```

2. Editor Configuration
   - Set up Plate editor with plugins
   - Configure editor options:
     - Markdown support
     - Auto-save behavior
     - History tracking
     - Custom styling

3. Required Plugins
   - Basic marks for text formatting
   - Headings for document structure
   - Block quotes for emphasis
   - Lists for organized content

### Key Implementation Steps

1. Editor Setup
   - Create universal editor component
   - Add required plugins
   - Set up content handlers
   - Initialize with markdown content

2. Content Management
   - Convert JSON to initial markdown
   - Handle content updates
   - Save changes every 2 seconds (only if content changed)
   - Keep track of revisions

3. History Features
   - Save each version with timestamp
   - Show list of previous versions
   - Allow restoring old versions
   - Keep only last 15 revisions

4. UI Components
   - Formatting toolbar for text styling
   - History panel showing versions
   - Export buttons
   - Loading indicators

## 5. Implementation Instructions

### Required Dependencies
- Plate.js (@udecode/plate)
- Required Plate plugins for:
  - Basic formatting
  - Headings
  - Block quotes
  - Lists

### Data Structure Updates
1. Add new fields to toolSessions:
   ```javascript
   {
     // ... existing fields ...
     "editorState": {
       "markdownContent": string,
       "lastEditedAt": timestamp,
       "editHistory": [
         {
           "content": string,
           "timestamp": timestamp,
           "type": "initial" | "auto-save" | "manual-save" | "restore"
         }
       ]
     }
   }
   ```

### Key Features
1. Rich Text Editing
   - Basic text formatting (bold, italic, underline)
   - Headers (H1-H6)
   - Lists (ordered and unordered)
   - Block quotes

2. Tool-Specific Formatting
   - Maintain consistent formatting per tool type
   - Preserve structure during editing
   - Support tool-specific markdown patterns
   - Handle special characters and formatting

3. History Management
   - Save changes every 2 seconds (only if content changed)
   - Compare content before saving to avoid duplicate entries
   - Keep last 15 versions
   - Restore previous versions
   - Undo/redo support

4. User Interface
   - Clean editor interface
   - Formatting toolbar
   - History panel with version list
   - Export options (PDF/Text/HTML)

## 6. Implementation Phases

### Phase 1: Basic Editor Setup
1. Plate.js Setup
   - Install Plate.js and plugins
   - Create universal editor component
   - Configure editor options
   - Set up basic editor state

2. Content Management
   - Implement tool-specific JSON to Markdown converters
   - Create format-specific templates
   - Auto-save functionality:
     - Debounce timer of 2 seconds
     - Check for content changes before saving
     - Skip save if content unchanged
   - Basic error handling
   - Revision limit implementation
   - Content sanitization

### Phase 2: History Features
1. Version Control
   - Edit history tracking with revision limit
   - History browser UI
   - Version restoration
   - Undo/redo implementation
   - Automatic cleanup of old revisions

2. Data Structure
   - Update Firestore schema
   - Implement history storage
   - Add version metadata
   - Implement revision limit logic

### Phase 3: Export & Polish
1. Export Features
   - PDF export implementation
   - Plain text export
   - HTML export

2. UI/UX Improvements
   - Loading states
   - Error handling (generation failed, incorrect data format, etc.)

## 7. Implementation Tips

### Component Structure
1. Create a universal editor component that:
   - Handles JSON to Markdown conversion per tool type
   - Manages editor state
   - Implements auto-save logic
   - Handles history management
   - Replaces all existing response components for tools with editor

2. Converter Implementation
   - Create separate converter for each tool type
   - Maintain consistent formatting patterns
   - Handle edge cases in tool outputs
   - Validate conversion results

### State Management
1. Editor State:
   - Keep editor state in local React state
   - Only save to Firestore when changes detected
   - Use debounce to prevent excessive Firestore writes
   - Compare content before saving
   - Always work with a copy of the original tool response

2. History Management:
   - Implement as array with push/pop operations
   - Store timestamps with each version
   - Maintain 15 version limit
   - Clean up old versions automatically

### Success Criteria
- Editor works smoothly
- Changes save automatically
- Old versions can be restored
- Exports work correctly
- Code base remains consistent
- Tool-specific formatting is maintained
