import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileUp, 
  FileText, 
  Eye, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Download,
  UploadCloud,
  FileCode
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DocumentManager = () => {
  const { documents, uploadDocument, setSelectedDocument } = useApp();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSimulateDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setUploading(true);

    setTimeout(() => {
      uploadDocument({
        name: "Telemetry_Field_Validation_Log_v1.0.pdf",
        category: "Field Telemetry",
        size: "3.8 MB",
        version: "v1.0",
        summary: "Empirical test logs from Broadway & 4th Street sensor junction node.",
        contentPreview: `SECTION 1: ON-SITE TELEMETRY LOGS\n\nRun timestamp: 2026-11-17 18:30:00 PST\nAmbient Temp: 28.4°C\nTotal Packets Broadcast: 48,200\nPacket Delivery Ratio: 99.4%\nAverage Latency: 14.1ms`
      });
      setUploading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleSimulateDrop}
        onClick={() => {
          if (!uploading) handleSimulateDrop({ preventDefault: () => {} });
        }}
        className={`p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center glass-panel ${
          dragOver 
            ? 'border-[#38BDF8] bg-[#38BDF8]/10' 
            : 'border-white/[0.12] hover:border-white/[0.24] hover:bg-white/[0.02]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#38BDF8]">
            <UploadCloud className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F1F5F9]">
              {uploading ? "Parsing and registering document metadata..." : "Drop research deliverables or papers here"}
            </h4>
            <p className="text-xs text-[#94A3B8] mt-1">
              Supports PDF, DOCX, LaTeX .tex, PPTX up to 100MB. Auto-registers SHA-256 for academic audit integrity.
            </p>
          </div>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-[#F1F5F9] border border-white/[0.08] transition-colors"
          >
            Browse Local File
          </button>
        </div>
      </div>

      {/* Documents Table / Grid */}
      <div className="glass-panel rounded-2xl overflow-hidden border-white/[0.08]">
        <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#F1F5F9]">
              Document Repository & Version Audit
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Peer-reviewed technical deliverables with mentor annotation threads
            </p>
          </div>
          <span className="text-xs font-mono-tabular text-[#94A3B8]">
            {documents.length} artifacts tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] text-[#94A3B8] border-b border-white/[0.06] font-mono-tabular">
              <tr>
                <th className="py-3 px-4 font-medium">Document Name</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Version</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Annotations</th>
                <th className="py-3 px-4 font-medium">Size</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {documents.map((doc) => {
                const annotationsCount = (doc.annotations || []).length;
                const unresolvedCount = (doc.annotations || []).filter(a => !a.resolved).length;

                return (
                  <tr 
                    key={doc.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-[#38BDF8] shrink-0" strokeWidth={1.5} />
                        <div>
                          <span className="font-semibold text-[#F1F5F9] group-hover:text-[#38BDF8] transition-colors">
                            {doc.name}
                          </span>
                          <span className="block text-[10px] text-[#94A3B8] font-mono-tabular">
                            by {doc.author} • {new Date(doc.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#94A3B8]">
                      {doc.category}
                    </td>

                    <td className="py-3.5 px-4 font-mono-tabular">
                      <span className="px-1.5 py-0.5 rounded bg-white/[0.05] text-[#94A3B8] border border-white/[0.06]">
                        {doc.version}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge 
                        variant={doc.status === 'Approved' ? 'emerald' : 'amber'} 
                        size="xs"
                      >
                        {doc.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 font-mono-tabular">
                      {annotationsCount > 0 ? (
                        <div className="flex items-center gap-1.5 text-xs text-[#38BDF8]">
                          <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>{annotationsCount} comments</span>
                          {unresolvedCount > 0 && (
                            <span className="text-[10px] text-[#F59E0B]">({unresolvedCount} open)</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#94A3B8] text-[11px]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono-tabular text-[#94A3B8]">
                      {doc.size}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedDocument(doc)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#F1F5F9] hover:text-[#38BDF8] border border-white/[0.08] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span>Inspect & Annotate</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
