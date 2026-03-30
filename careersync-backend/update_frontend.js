const fs = require('fs');

const apiServicePath = 'careersync-frontend/src/services/apiService.ts';
let apiService = fs.readFileSync(apiServicePath, 'utf8');
apiService = apiService.replace(/,\s*createPaymentOrder,\s*verifyPayment\s*/g, '');
fs.writeFileSync(apiServicePath, apiService);

const bookingPagePath = 'careersync-frontend/src/app/book/[serviceId]/page.tsx';
let bookingPage = fs.readFileSync(bookingPagePath, 'utf8');

// replace imports
bookingPage = bookingPage.replace(/,\s*createPaymentOrder,\s*verifyPayment\s*/g, '');
bookingPage = bookingPage.replace(/import\s*Script\s*from\s*"next\/script";\n/g, '');
bookingPage = bookingPage.replace(/import\s*{\s*createBooking\s*}\s*from\s*"@\/services\/apiService";\n?/g, ''); // in case
bookingPage = bookingPage.replace(/import { getServiceById/g, 'import { getServiceById, createBooking');

// remove razorpay interfaces using start/end markers
const interfacesToRemove = [
  'interface RazorpayResponse',
  'interface RazorpayOptions'
];

let finalBookingPage = '';
let inInterfaceToSkip = false;
let braceCount = 0;

const lines = bookingPage.split('\n');
for (const line of lines) {
  if (!inInterfaceToSkip) {
    if (interfacesToRemove.some(int => line.includes(int))) {
      inInterfaceToSkip = true;
      braceCount = 1; // Assuming { is on the same line
      continue;
    }
  }

  if (inInterfaceToSkip) {
    if (line.includes('{')) braceCount++;
    if (line.includes('}')) braceCount--;
    if (braceCount === 0) {
      inInterfaceToSkip = false;
    }
    continue;
  }

  finalBookingPage += line + '\n';
  
}

// Write the file temporarily, we will do regex replace on the handler
fs.writeFileSync(bookingPagePath, finalBookingPage);
