'use client';

import React from 'react';

import { withRef } from '@udecode/cn';
import { SlateElement } from '@udecode/plate';

export const CodeLineElement = withRef((props, ref) => (
  <SlateElement ref={ref} {...props} />
));
