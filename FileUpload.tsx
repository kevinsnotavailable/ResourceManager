import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useStore } from '../store';
import type { WorksheetFile } from '../types';

interface FileUploadProps {
  worksheetId: string;
}

export function FileUpload({ worksheetId }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addFile = useStore((state) => state.addFile);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const worksheetFile: WorksheetFile = {
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type,
          size: file.size,
          content: content,
          uploadedAt: new Date(),
        };
        addFile(worksheetId, worksheetFile);
      };
      reader.readAsDataURL(file);
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mt-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        id={`file-upload-${worksheetId}`}
      />
      <label
        htmlFor={`file-upload-${worksheetId}`}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer w-fit"
      >
        <Upload size={16} />
        Upload Files
      </label>
    </div>
  );
}