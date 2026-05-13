import SocialShareImage from './SocialShareImage';
import Favicon from './Favicon';
import { Download } from 'lucide-react';

export default function BrandAssetsPage() {
  const downloadSocialImage = () => {
    // Create a canvas to render the social image
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Note: This is a simplified version. For production, you'd want to use html2canvas or similar
      alert('To download: Right-click on the image preview and select "Save image as..."');
    }
  };

  const downloadFavicon = () => {
    const svg = document.getElementById('favicon-preview');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'favicon.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">Brand Assets</h1>
        <p className="text-xl text-slate-400">Social share image and favicon for your case study deck</p>
      </div>

      {/* Social Share Image Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Social Share Image</h2>
            <p className="text-slate-400">1200 × 630px • Open Graph / Twitter Card</p>
          </div>
          <button
            onClick={downloadSocialImage}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Instructions
          </button>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 overflow-hidden">
          <div className="transform scale-[0.6] origin-top-left w-[1200px]">
            <SocialShareImage />
          </div>
        </div>

        <div className="mt-6 bg-slate-800/30 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">How to use:</h3>
          <ul className="text-slate-300 space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
              <span>Add to your website's &lt;head&gt; with Open Graph meta tags</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
              <span>Use for social media sharing (LinkedIn, Twitter, Facebook)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
              <span>Right-click on the preview above and "Save image as..." to download</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Favicon Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Favicon</h2>
            <p className="text-slate-400">32 × 32px • SVG Format (Scalable)</p>
          </div>
          <button
            onClick={downloadFavicon}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            <Download className="w-5 h-5" />
            Download SVG
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-12">
          <div className="flex items-center gap-12">
            {/* Large preview */}
            <div className="flex flex-col items-center gap-4">
              <div className="p-8 bg-slate-900 rounded-2xl">
                <div id="favicon-preview" className="transform scale-[8]">
                  <Favicon />
                </div>
              </div>
              <p className="text-slate-400 text-sm">256px Preview</p>
            </div>

            {/* Size variations */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-6">Size Previews:</h3>
              <div className="grid grid-cols-4 gap-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
                    <div className="scale-[2]">
                      <Favicon />
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs">64px</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Favicon />
                  </div>
                  <p className="text-slate-400 text-xs">32px</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
                    <div className="scale-[0.5]">
                      <Favicon />
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs">16px</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <Favicon />
                  </div>
                  <p className="text-slate-400 text-xs">On white</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-slate-800/30 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">How to use:</h3>
          <ul className="text-slate-300 space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
              <span>Download the SVG file and place it in your public folder</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
              <span>Add to your HTML: &lt;link rel="icon" type="image/svg+xml" href="/favicon.svg"&gt;</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
              <span>For broader compatibility, convert to .ico format using an online tool</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
              <span>The geometric design symbolizes structure, creativity, and precision</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Design Notes */}
      <div className="max-w-7xl mx-auto mt-16 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-4">Design Philosophy</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          These brand assets reflect your studio's sophisticated, modern aesthetic. The geometric symbol represents the intersection of structure and creativity—a rotated square creating a diamond shape that suggests transformation and precision in design.
        </p>
        <p className="text-slate-300 leading-relaxed">
          The gradient from blue to purple to emerald mirrors the glass morphism effects throughout your deck, creating a cohesive brand identity that speaks to enterprise clients seeking high-end design and UX services.
        </p>
      </div>
    </div>
  );
}