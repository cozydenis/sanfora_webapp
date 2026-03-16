'use client';

import { useState, useId } from 'react';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  existingUrl?: string;
}

export function ImageUploader({ onUploadComplete, onRemove, existingUrl }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const inputId = useId();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Datei ist zu groß. Maximale Größe: 10MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Bitte nur Bilddateien hochladen');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onUploadComplete(data.url);
      } else {
        alert('Fehler beim Hochladen des Bildes');
        setPreview(existingUrl || null);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Fehler beim Hochladen des Bildes');
      setPreview(existingUrl || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-luxury-gray-300 rounded-lg p-6 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={inputId}
        disabled={uploading}
      />
      <label
        htmlFor={inputId}
        className={`cursor-pointer block ${uploading ? 'opacity-50' : ''}`}
      >
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Vorschau"
              className="max-h-40 mx-auto rounded-md object-cover"
            />
            <div className="flex gap-2 justify-center">
              <p className="text-sm text-luxury-gray-600">
                {uploading ? 'Lädt hoch...' : 'Klicken zum Ändern'}
              </p>
              {onRemove && !uploading && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPreview(null);
                    onRemove();
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Entfernen
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl text-luxury-gray-400">📁</div>
            <p className="text-luxury-black font-medium">
              Klicken zum Hochladen
            </p>
            <p className="text-sm text-luxury-gray-600">
              PNG, JPG, WEBP bis zu 10MB
            </p>
          </div>
        )}
      </label>
    </div>
  );
}
