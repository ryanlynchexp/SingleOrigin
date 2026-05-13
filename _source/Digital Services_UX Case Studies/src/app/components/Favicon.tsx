export default function Favicon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dark background */}
      <rect width="32" height="32" rx="6" fill="#0F172A"/>
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="faviconGradient" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA"/>
          <stop offset="50%" stopColor="#A78BFA"/>
          <stop offset="100%" stopColor="#34D399"/>
        </linearGradient>
      </defs>
      
      {/* Outer rotated square - design symbol */}
      <rect 
        x="16" 
        y="16" 
        width="14" 
        height="14" 
        rx="2"
        transform="rotate(45 16 16)"
        fill="url(#faviconGradient)"
        opacity="0.9"
      />
      
      {/* Inner rotated square - creates the frame effect */}
      <rect 
        x="16" 
        y="16" 
        width="10" 
        height="10" 
        rx="1.5"
        transform="rotate(45 16 16)"
        fill="#0F172A"
        opacity="0.6"
      />
      
      {/* Center dot - focal point */}
      <circle 
        cx="16" 
        cy="16" 
        r="2" 
        fill="white"
      />
    </svg>
  );
}
