'use client';

import { Document, Page } from 'react-pdf';

import Loading from '../loading';

interface Props {
  url: string;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  numPages: number;
  isDesktop: boolean;
}

const PdfDocument = ({
  url,
  onDocumentLoadSuccess,
  numPages,
  isDesktop,
}: Props) => {
  const pageNumbers = [...Array(numPages).keys()].map((page) => page + 1);
  return (
    <Document
      loading={<Loading />}
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      className="flex flex-col gap-y-1 md:gap-y-2"
    >
      {pageNumbers.map((page) => (
        <Page
          key={page}
          pageNumber={page}
          className="flex max-w-3xl justify-center !bg-transparent"
          width={isDesktop ? 690 : 400}
        />
      ))}
    </Document>
  );
};

export default PdfDocument;
