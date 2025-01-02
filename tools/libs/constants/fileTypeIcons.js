import {
  Image,
  Movie,
  Language,
  PictureAsPdf,
  TextSnippet
} from '@mui/icons-material';

import CSVFile from '@/assets/svg/CSVFile.svg';
import GoogleSheet from '@/assets/svg/GoogleSheet.svg';
import Markdown from '@/assets/svg/markdown-fill.svg';
import PPTX from '@/assets/svg/PPTXIcon.svg';
import DOCX from '@/assets/svg/DOCXIcon.svg';
import XLS from '@/assets/svg/XLSXIcon.svg';
import XML from '@/assets/svg/XMLIcon.svg';
import GoogleDocsIcon from '@/assets/svg/GoogleDocsIcon.svg';
import GoogleSlidesIcon from '@/assets/svg/GoogleSlidesIcon.svg';
import GoogleDriveIcon from '@/assets/svg/GoogleDriveIcon.svg';

export const FILE_TYPE_ICONS = {
  youtube_url: Language,
  PDF: PictureAsPdf,
  CSV: CSVFile,
  GOOGLE_SHEETS: GoogleSheet,
  TXT: TextSnippet,
  URL: Language,
  MD: Markdown,
  PPTX: PPTX,
  DOCX: DOCX,
  XLS: XLS,
  XML: XML,
  GOOGLE_DOCS: GoogleDocsIcon,
  GOOGLE_SLIDES: GoogleSlidesIcon,
  GOOGLE_DRIVE: GoogleDriveIcon,
  IMAGES: Image,
};