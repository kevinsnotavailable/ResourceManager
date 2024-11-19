import React, { useState } from 'react';
import { FileText, Download, Trash2, ChevronDown, ChevronRight, Eye } from 'lucide-react';
import { useStore } from '../store';
import type { WorksheetFile } from '../types';

interface FileListProps {
  worksheetId: string;
  files: WorksheetFile[];
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function FileList({ worksheetId, files }: FileListProps) {
  const deleteFile = useStore((state) => state.deleteFile);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<WorksheetFile | null>(null);

  const handleDownload = (file: WorksheetFile) => {
    const link = document.createElement('a');
    link.href = file.content;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = (fileId: string) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(fileId)) {
      newExpanded.delete(fileId);
    } else {
      newExpanded.add(fileId);
    }
    setExpandedFiles(newExpanded);
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Attached Files</h4>
      <div className="space-y-2">
        {files.map((file) => {
          const isExpanded = expandedFiles.has(file.id);
          return (
            <div
              key={file.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden"
            >
              {/* Compact View */}
              <div className="flex items-center justify-between p-2">
                <button
                  onClick={() => toggleExpand(file.id)}
                  className="flex items-center gap-2 flex-1 min-w-0"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500 dark:text-gray-400 shrink-0" />
                  )}
                  <FileText size={16} className="text-gray-500 dark:text-gray-400 shrink-0" />
                  <span className="truncate text-sm font-medium dark:text-white">{file.name}</span>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="p-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Preview"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => deleteFile(worksheetId, file.id)}
                    className="p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-8 pb-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Size: {formatFileSize(file.size)}</p>
                  <p>Type: {file.type || 'Unknown'}</p>
                  <p>Uploaded: {new Date(file.uploadedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold dark:text-white">{previewFile.name}</h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">
              {previewFile.type.startsWith('image/') ? (
                <img
                  src={previewFile.content}
                  alt={previewFile.name}
                  className="max-w-full h-auto"
                />
              ) : previewFile.type.startsWith('text/') || previewFile.type.includes('pdf') ? (
                <iframe
                  src={previewFile.content}
                  className="w-full h-[70vh]"
                  title={previewFile.name}
                />
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Preview not available for this file type
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}