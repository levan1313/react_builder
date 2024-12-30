import React, { useEffect, useRef } from 'react';

interface PreviewFrameProps {
  htmlContent: string;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [htmlContent]);

  return <iframe ref={iframeRef} style={{ width: '100%', height: '500px', border: 'none' }} />;
};

export default PreviewFrame;
