import React from 'react';
import { WorksheetList } from '../components/WorksheetList';

export function WorksheetsPage() {
  return (
    <div>
      <WorksheetList showControls={true} />
    </div>
  );
}