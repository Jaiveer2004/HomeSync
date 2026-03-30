const fs = require('fs');

const pagePath = '/home/jaiveer/FSE-Project/MERN-Project/Remake/careersync-frontend/src/app/book/[serviceId]/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

content = content.replace(/;\s*theme:\s*{\s*color:\s*string;\s*};\s*}/g, '');

fs.writeFileSync(pagePath, content);
