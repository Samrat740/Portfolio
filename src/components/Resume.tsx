// src/components/Resume.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';

/*
  Local files (from this session):
  - PDF: /mnt/data/resume.pdf
  - Preview image: /mnt/data/94314a8e-68dc-4cbb-bf26-ad1390f19d56.png
  - Lottie JSON (accent): /mnt/data/Loading Yeti.json

  If you later move files to public/, update paths to e.g. "/resume.pdf" and "/resume_image.jpg".
*/

const RESUME_PDF = 'public/resume.pdf';
const PREVIEW_IMAGE = 'public/resume_image.jpg';
const LOTTIE_SRC = '<public />Loading Yeti.json';

export default function Resume() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D tilt effect for the preview card
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) - 0.5; // -0.5 .. 0.5
      const py = (y / rect.height) - 0.5;
      const rotateY = px * 8; // tilt intensity
      const rotateX = -py * 8;
      setTilt({ rotateX, rotateY, scale: 1.02 });
    }

    function onLeave() {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="resume" className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left column: text and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">My Resume</h2>

            <p className="text-lg text-gray-600 max-w-xl">
              A concise snapshot of my experience, projects and certifications.
              View or download the full PDF, or open the preview image to inspect page snapshots.
            </p>

            <div className="flex items-center gap-4">
              {/* View opens PDF in new tab */}
              <a
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-white/95 border border-gray-200 shadow-sm text-sm font-medium text-gray-900 hover:shadow-md transition"
                aria-label="Open resume PDF in new tab"
              >
                <FileText className="w-5 h-5" />
                View Resume
              </a>

              {/* Download downloads PDF */}
              <a
                href={RESUME_PDF}
                download
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium shadow-md hover:opacity-95 transition"
                aria-label="Download resume PDF"
              >
                <Download className="w-4 h-4" />
                Download
              </a>

              {/* Tiny Lottie accent */}
              <div className="ml-2 hidden sm:block">
                <lottie-player
                  src={LOTTIE_SRC}
                  background="transparent"
                  speed="1"
                  style={{ width: 56, height: 56 }}
                  loop
                  autoplay
                  aria-label="accent animation"
                />
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Tip: Click <strong>View Resume</strong> to open the PDF. Click the preview card to view the JPG preview.
            </div>
          </motion.div>

          {/* Right column: unique preview card (opens JPG preview modal) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <motion.div
              ref={cardRef}
              style={{
                transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
              }}
              className="relative w-full max-w-xs md:max-w-sm"
            >
              {/* gradient border */}
              <div className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="block w-full rounded-xl overflow-hidden bg-white/90 backdrop-blur-md"
                  aria-label="Open resume preview image"
                >
                  <div className="relative">
                    {/* decorative top band */}
                    <div className="absolute left-0 top-0 w-full h-12 md:h-14 bg-gradient-to-r from-indigo-600/80 to-purple-500/80 transform -skew-y-2 origin-left" />

                    <div className="pt-14 md:pt-16 px-4 pb-4">
                      <div className="w-full aspect-[3/4] rounded-md overflow-hidden shadow-inner">
                        <img
                          src={PREVIEW_IMAGE}
                          alt="Resume preview"
                          className="w-full h-full object-cover object-center block"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Samrat Ghosh</div>
                          <div className="text-xs text-gray-500">B.Tech CSE • ML & RPA</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2 py-1 text-xs bg-white/80 rounded-full border border-gray-200 text-gray-700">
                            Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* floating quick-download button */}
              <a
                href={RESUME_PDF}
                download
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 border border-gray-200 shadow-md hover:scale-105 transition"
                aria-label="Quick download resume PDF"
              >
                <Download className="w-4 h-4 text-gray-800" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Preview modal: shows the JPG preview image */}
      {previewOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setPreviewOpen(false)}
          />

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 max-w-4xl w-full h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-4 right-4 z-20 bg-white/90 rounded-full p-2 shadow"
              aria-label="Close preview"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            <div className="w-full h-full flex flex-col md:flex-row">
              <div className="md:flex-1 h-full bg-gray-50 flex items-center justify-center p-6">
                <img
                  src={PREVIEW_IMAGE}
                  alt="Full resume preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <aside className="w-full md:w-80 p-6 bg-white border-l border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Preview</h3>
                <p className="text-sm text-gray-600 mb-4">This preview shows the snapshot image. Use the actions below for the PDF.</p>

                <div className="flex flex-col gap-3">
                  <a
                    href={RESUME_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium shadow"
                  >
                    <FileText className="w-4 h-4" />
                    Open PDF
                  </a>

                  <a
                    href={RESUME_PDF}
                    download
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>

                  <div className="pt-4 text-xs text-gray-500">
                    Tip:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Use <strong>Open PDF</strong> to view the full document.</li>
                      <li>Use <strong>Download PDF</strong> to save it locally.</li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
