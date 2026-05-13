import { useState } from "react";
import { FileText, Upload, X, Download, Sparkles } from "lucide-react";
import { acmeProposalData } from "../../data/acmeProposalData";

export function DocumentTabContent() {
  const [files, setFiles] = useState(acmeProposalData.document.files || []);

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="glass-strong rounded-xl p-8 border border-white/10">
        <h2 className="text-2xl text-foreground mb-6 font-medium">RFP Documents</h2>
        
        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="mb-6 space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg glass-inset border border-white/10 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-foreground font-medium">{file.name}</p>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded glass-subtle border border-success/20 text-success">
                        <Sparkles className="w-3 h-3" strokeWidth={2} />
                        <span className="text-xs font-medium">Processed</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • Uploaded {file.uploadedDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 glass-subtle border border-white/10 hover:bg-white/10 rounded-lg transition-all">
                    <Download className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="p-2 glass-subtle border border-white/10 hover:bg-destructive/10 hover:border-destructive/30 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4 text-destructive" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Area */}
        <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center glass-inset hover:border-primary/30 transition-all cursor-pointer">
          <div className="w-16 h-16 rounded-xl glass-subtle border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <p className="text-foreground mb-2 font-medium">
            {files.length > 0 ? "Upload Additional Documents" : "Upload RFP Document"}
          </p>
          <p className="text-sm text-muted-foreground mb-4">PDF, DOCX, or TXT • Max 10MB</p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all glow-primary font-medium">
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
}