import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export interface SlideChapter {
  index: number;
  label: string;
  color: string;
}

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  chapters?: SlideChapter[];
  onSlideChange?: (index: number) => void;
  isLiteMode?: boolean;
}

export function SlideNavigation({ 
  currentSlide, 
  totalSlides, 
  onPrevious, 
  onNext,
  chapters = [],
  onSlideChange,
  isLiteMode = false
}: SlideNavigationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentChapter = (slideIndex: number) => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (slideIndex >= chapters[i].index) {
        return chapters[i];
      }
    }
    return chapters[0];
  };

  const currentChapter = getCurrentChapter(currentSlide);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSlideCounterClick = () => {
    setInputValue(String(currentSlide + 1));
    setIsEditing(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const slideNumber = parseInt(inputValue, 10);
      if (!isNaN(slideNumber) && slideNumber >= 1 && slideNumber <= totalSlides) {
        onSlideChange?.(slideNumber - 1);
      }
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Horizontal Progress Stepper */}
          {chapters.length > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 order-2 sm:order-1">
              {chapters.map((chapter, idx) => {
                const isActive = currentSlide >= chapter.index && (idx === chapters.length - 1 || currentSlide < chapters[idx + 1]?.index);
                const isPast = currentSlide > chapter.index && idx < chapters.length - 1 && currentSlide >= chapters[idx + 1]?.index;
                
                // Calculate progress for the connector line
                const nextChapter = chapters[idx + 1];
                const isInProgressSection = isActive && nextChapter;
                const isNextActive = nextChapter && currentSlide >= nextChapter.index && (idx + 1 === chapters.length - 1 || currentSlide < chapters[idx + 2]?.index);
                let progressPercent = 0;
                
                if (isInProgressSection) {
                  const chapterLength = nextChapter.index - chapter.index;
                  const slideProgress = currentSlide - chapter.index;
                  progressPercent = Math.min((slideProgress / chapterLength) * 100, 100);
                }
                
                // Check if we need extra spacing on connector line (when either adjacent circle has a ring)
                const needsExtraSpacing = isActive || isNextActive;
                
                return (
                  <div key={chapter.index} className="flex items-center">
                    {/* Chapter Dot */}
                    <div className="relative group flex items-center z-10">
                      <button
                        onClick={() => onSlideChange?.(chapter.index)}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all p-2 -m-2 ${ 
                          isActive 
                            ? `${chapter.color} ring-2 sm:ring-3 ring-offset-2 ring-offset-white ${chapter.color.replace('bg-', 'ring-')}/30` 
                            : isPast
                            ? `${chapter.color} opacity-60 hover:opacity-100`
                            : isLiteMode 
                            ? 'bg-slate-400 hover:bg-slate-500'
                            : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to ${chapter.label}`}
                      />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        <div className="bg-slate-900 text-white text-[10px] sm:text-xs px-2 py-1 rounded shadow-xl">
                          {chapter.label}
                        </div>
                      </div>
                    </div>
                    
                    {/* Connector Line with Progress */}
                    {idx < chapters.length - 1 && (
                      <div className={`relative w-4 sm:w-6 h-0.5 bg-slate-300 rounded-full overflow-hidden flex items-center z-0 ${needsExtraSpacing ? 'mx-[10px]' : 'mx-1.5 sm:mx-2'}`}>
                        {/* Progress Fill */}
                        <div 
                          className={`absolute left-0 top-0 h-full transition-all duration-300 rounded-full ${chapter.color}`}
                          style={{ 
                            width: isPast ? '100%' : isInProgressSection ? `${progressPercent}%` : '0%'
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2">
            <button
              onClick={onPrevious}
              disabled={currentSlide === 0}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-slate-200"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            </button>
            
            <div className="flex items-center gap-1.5 bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-md border border-slate-200">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  className="w-10 text-slate-900 text-xs sm:text-sm font-medium bg-transparent outline-none text-center"
                />
              ) : (
                <button
                  onClick={handleSlideCounterClick}
                  className="text-slate-900 text-xs sm:text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  {currentSlide + 1}
                </button>
              )}
              <span className="text-slate-400 text-xs sm:text-sm">/</span>
              <span className="text-slate-500 text-xs sm:text-sm">
                {totalSlides}
              </span>
            </div>

            <button
              onClick={onNext}
              disabled={currentSlide === totalSlides - 1}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-slate-200"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}