export function getAnimationCss(params) {
    if (params.animation === 'none')
        return '';
    const d = `${params.duration}s`;
    switch (params.animation) {
        case 'fade':
            return `
        @keyframes fade { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
        g { animation: fade ${d} ease-in-out infinite; }
      `;
        case 'bounce':
            return `
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        g { animation: bounce ${d} ease-in-out infinite; }
      `;
        case 'rainbow':
            return `
        @keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
        g { animation: rainbow ${d} linear infinite; }
      `;
        case 'writing':
            return `
        @keyframes draw { to { stroke-dashoffset: 0; fill-opacity: 1; } }
        path {
          stroke: ${params.color};
          stroke-width: 1;
          fill-opacity: 0;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw ${d} forwards;
        }
      `;
        default:
            return '';
    }
}
