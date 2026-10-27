const fs = require('fs');
const p = 'E:/projects/alfa-ecommerce/app/user/search/[searchInput]/components/filter.jsx';
let s = fs.readFileSync(p, 'utf8');
const start = s.indexOf('const BRAND_OPTIONS');
if (start >= 0) {
  const end = s.indexOf('];', start);
  if (end >= 0) {
    const fixed = `const BRAND_OPTIONS = [
  { value: "Senator", labelKey: "Senator" },
  { value: "OMEGA", labelKey: "OMEGA" },
  { value: "PANORAMA", labelKey: "PANORAMA" },
  { value: "IBOX", labelKey: "IBOX" },
];`;
    s = s.slice(0, start) + fixed + s.slice(end + 2);
    fs.writeFileSync(p, s);
    console.log('ok');
  } else {
    console.log('noend');
  }
} else {
  console.log('nostart');
}
