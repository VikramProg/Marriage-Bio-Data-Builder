import React, { useState } from 'react';

const ImageExportModal = ({ onExport, onCancel }) => {
  const [format, setFormat] = useState('jpeg');

  const handleExport = () => {
    onExport(format);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Export as Image</h2>
        <div className="mb-4">
          <label htmlFor="format" className="block text-gray-700 text-sm font-bold mb-2">
            Image Format
          </label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageExportModal;
