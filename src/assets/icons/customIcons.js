// Helper to format 100% safe SVG Data URIs for browser <img> tags
const makeSvg = (svgStr) => `data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`;

export const python = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#387eb8" d="M62.6 3.2c-27.1 0-25.4 11.7-25.4 11.7l.1 12.1h25.8v3.7H27.5S10 28.9 10 56.4c0 27.5 15.3 26.5 15.3 26.5h9.1v-12.8c0-14.5 12.4-13.7 12.4-13.7h25.3s12.2.2 12.2-11.7V20.2s1.8-17-21.7-17z"/><path fill="#ffe052" d="M65.1 124.8c27.1 0 25.4-11.7 25.4-11.7l-.1-12.1H64.6v-3.7h35.6s17.5 1.8 17.5-25.7c0-27.5-15.3-26.5-15.3-26.5h-9.1v12.8c0 14.5-12.4 13.7-12.4 13.7H56.1s-12.2-.2-12.2 11.7v24.5s-1.8 17 21.2 17z"/><circle fill="#fff" cx="45" cy="15" r="4"/><circle fill="#fff" cx="83" cy="113" r="4"/></svg>`);

export const java = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#ea2d2e" d="M47.7 93.3s-7.1 3.5 4.9 4.7c14.6 1.4 22.1 1.2 34.6-1.5 0 0 4.4 2.8 10.4.7-17 9.8-49.9 5.1-49.9-3.9z"/><path fill="#0074bd" d="M43.7 107.8s-7.6 4.3 4 5c15.8 1 27.9.5 44-2.8 0 0 3 2 7.7.8-19.8 8-55.7 5.1-55.7-3z"/><path fill="#ea2d2e" d="M64.7 78c7.4.7 16.5-1 20.8-4.9-5.3 1.2-12 1.8-17.7 1.3-12.7-1.2-22.3-6.2-7.5-13.8 2.6-1.3 6.9-2.7 10.5-3.8-9.4 1.7-18.7 4.9-19.1 9.9-.4 6.7 13 10.3 13 11.3z"/><path fill="#0074bd" d="M78 61c4.5-5.2 2.3-9.8-3.4-14-11.4 8.7-2.2 13-16.1 26-9.6 9-24 16.7-5.1 18 19 1.4 46-2.5 46-17.4.1-8-12-10.4-21.4-12.6z"/></svg>`);

export const cpp = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#00599C" d="M117.5 35L67.7 6.3c-2.3-1.3-5.1-1.3-7.4 0L10.5 35C8.2 36.3 6.8 38.8 6.8 41.5v57.4c0 2.7 1.4 5.2 3.7 6.5l49.8 28.7c2.3 1.3 5.1 1.3 7.4 0l49.8-28.7c2.3-1.3 3.7-3.8 3.7-6.5V41.5c0-2.7-1.4-5.2-3.7-6.5z"/><text x="32" y="82" font-family="Arial" font-weight="bold" font-size="52" fill="#ffffff">C++</text></svg>`);

export const vite = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#bd34fe" d="M123.5 18.5L68.8 121.2c-2.1 3.9-7.5 3.9-9.6 0L4.5 18.5c-2.4-4.5 2.1-9.6 6.8-7.8l50 18.8c1.7.6 3.7.6 5.4 0l50-18.8c4.7-1.8 9.2 3.3 6.8 7.8z"/><path fill="#ffc400" d="M92 6L44 88l-12-42 60-40z"/></svg>`);

export const framer = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#0055FF" d="M0 0h128v42.7H42.7zm0 42.7h85.3v42.7H0zm0 42.7h42.7v42.7z"/></svg>`);

export const uiux = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#8B5CF6"/><circle cx="48" cy="48" r="18" fill="#F472B6"/><rect x="72" y="30" width="36" height="36" rx="8" fill="#38BDF8"/><path d="M30 96l34-48 34 48H30z" fill="#FBBF24"/></svg>`);

export const apiIntegration = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0EA5E9"/><path d="M38 64h52M64 38v52" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle cx="38" cy="64" r="10" fill="#fff"/><circle cx="90" cy="64" r="10" fill="#fff"/><circle cx="64" cy="38" r="10" fill="#fff"/><circle cx="64" cy="90" r="10" fill="%23fff"/></svg>`);

export const graphql = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#E535AB" d="M64 10l46.7 27v54L64 118 17.3 91V37L64 10zM35 32v64h58V32H35z"/><circle cx="64" cy="10" r="10" fill="#E535AB"/><circle cx="110" cy="37" r="10" fill="#E535AB"/><circle cx="110" cy="91" r="10" fill="#E535AB"/><circle cx="64" cy="118" r="10" fill="#E535AB"/><circle cx="18" cy="91" r="10" fill="#E535AB"/><circle cx="18" cy="37" r="10" fill="#E535AB"/></svg>`);

export const restfulApi = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#10B981"/><text x="20" y="78" font-family="Arial" font-weight="900" font-size="38" fill="#ffffff">REST</text></svg>`);

export const mernStack = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#1E293B"/><text x="14" y="76" font-family="Arial" font-weight="900" font-size="34" fill="#38BDF8">MERN</text></svg>`);

export const sql = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0284C7"/><path d="M28 40c0-10 36-10 36-10s36 0 36 10-36 10-36 10-36 0-36-10zm0 24c0 10 36 10 36 10s36 0 36-10M28 88c0 10 36 10 36 10s36 0 36-10" fill="none" stroke="#fff" stroke-width="8"/></svg>`);

export const postgresql = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#336791"/><path d="M64 24C42 24 28 42 28 64s14 40 36 40 36-18 36-40S86 24 64 24z" fill="none" stroke="#fff" stroke-width="8"/><circle cx="50" cy="52" r="6" fill="#fff"/></svg>`);

export const firebase = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#FFCA28" d="M26 98l18-80 20 36z"/><path fill="#FFA000" d="M64 54l16-30 22 74z"/><path fill="#F57C00" d="M26 98l38 22 38-22-38-66z"/></svg>`);

export const figma = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#F24E1E" d="M42 22h22v22H42z"/><path fill="#FF7262" d="M64 22h22a11 11 0 0 1 0 22H64z"/><path fill="#A259FF" d="M42 44h22v22H42z"/><path fill="#1ABCFE" d="M64 44a11 11 0 1 1 22 0 11 11 0 0 1-22 0z"/><path fill="#0ACF83" d="M42 66h22v22a11 11 0 0 1-22 0z"/></svg>`);

export const wireframing = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="16" y="16" width="96" height="96" rx="16" fill="none" stroke="#6366F1" stroke-width="8" stroke-dasharray="8 8"/><rect x="32" y="32" width="64" height="24" rx="6" fill="#818CF8"/><rect x="32" y="64" width="28" height="32" rx="6" fill="#C7D2FE"/><rect x="68" y="64" width="28" height="32" rx="6" fill="#C7D2FE"/></svg>`);

export const prototyping = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#EC4899"/><path d="M40 36l52 28-52 28V36z" fill="#fff"/></svg>`);

export const awsEc2 = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#FF9900"/><rect x="32" y="32" width="64" height="64" rx="12" fill="#fff"/><text x="44" y="74" font-family="Arial" font-weight="900" font-size="28" fill="#FF9900">EC2</text></svg>`);

export const awsS3 = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#EAB308"/><path d="M34 44l30-16 30 16v40l-30 16-30-16V44z" fill="#fff"/></svg>`);

export const docker = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0db7ed"/><path d="M28 72c0 18 16 28 36 28s36-10 36-28H28z" fill="#fff"/><rect x="36" y="52" width="12" height="12" fill="#fff"/><rect x="52" y="52" width="12" height="12" fill="#fff"/><rect x="68" y="52" width="12" height="12" fill="#fff"/></svg>`);

export const postman = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#FF6C37"/><path d="M40 76l48-24-24 48-6-20-18-4z" fill="#fff"/></svg>`);

export const dsa = makeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#4F46E5"/><circle cx="64" cy="32" r="12" fill="#fff"/><circle cx="36" cy="88" r="12" fill="#fff"/><circle cx="92" cy="88" r="12" fill="#fff"/><path d="M64 44L36 76M64 44l28 32" stroke="#fff" stroke-width="6"/></svg>`);
