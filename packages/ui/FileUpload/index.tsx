import { Box, Typography, Button, Grid } from '@mui/material';
import { Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';

type MultiFileUploaderProps = {
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
};

export const MultiFileUploader: React.FC<MultiFileUploaderProps> = ({
  accept = 'image/*',
  maxSizeMB = 5,
  multiple = true,
  onFilesChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSelectFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    Array.from(selectedFiles).forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File ${file.name} exceeds ${maxSizeMB}MB`);
        return;
      }

      validFiles.push(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });

    setFiles((prev) => [...prev, ...validFiles]);
    setError('');
    onFilesChange?.(validFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectFiles(e.target.files);
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
      />

      <Box mt={2}>
        <Button variant="outlined" startIcon={<Upload />} onClick={handleClick}>
          Upload Files
        </Button>
      </Box>

      {files.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2">Selected files:</Typography>
          <ul style={{ paddingLeft: 20 }}>
            {files.map((file) => (
              <li key={file.name}>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </Box>
      )}

      {previews.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2">Image Preview:</Typography>
          <Grid container spacing={2}>
            {previews.map((url, idx) => (
              <Grid item xs={4} sm={3} key={url}>
                <img
                  src={url}
                  alt={`preview-${idx}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 6,
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
