const fs = require('fs');

const frontendPath = '/home/jaiveer/FSE-Project/MERN-Project/Remake/careersync-frontend';
const pagePath = frontendPath + '/src/app/book/[serviceId]/page.tsx';

let content = fs.readFileSync(pagePath, 'utf8');

// 1. Remove Razorpay script tags if any
content = content.replace(/<Script.*?checkout\.js.*?\/>/g, '');
content = content.replace(/import Script from "next\/script";\n/g, '');

// 2. Remove razorpay interfaces 
content = content.replace(/interface RazorpayResponse\s*{[^}]*}/g, '');
content = content.replace(/interface RazorpayOptions\s*{[^}]*(?:{[^}]*}[^}]*)*(?:{[^}]*}[^}]*)*}/g, '');

// 3. Make sure createBooking is imported
if (!content.includes('createBooking }')) {
  content = content.replace('getServiceProviders }', 'getServiceProviders, createBooking }');
}

// 4. Overwrite handleBookingSubmit
const newHandler = `const handleBookingSubmit = async (bookingDetails: BookingDetails) => {
    if (!service) return toast.error("Service details not loaded.");
    if (!selectedProvider) return toast.error("Please select a service provider.");

    const toastId = toast.loading("Submitting your application...");

    try {
      await createBooking({
        ...bookingDetails,
        serviceId: serviceId,
        providerId: selectedProvider._id
      });
      toast.dismiss(toastId);
      toast.success("Application submitted successfully!");
      router.push('/my-bookings');
    } catch (error) {
      console.error("Application submission failed:", error);
      toast.dismiss(toastId);
      const errorMessage = error instanceof Error && 'response' in error && 
        (error as any).response && typeof (error as any).response === 'object' && 
        'data' in (error as any).response && (error as any).response.data && 
        typeof (error as any).response.data === 'object' && 'message' in (error as any).response.data
        ? String((error as any).response.data.message)
        : "Failed to submit application.";
      toast.error(errorMessage);
    }
  };`;

// replace from `const handleBookingSubmit` until the closing `};` of the function.
// simpler: just regex everything from `const handleBookingSubmit` up to `if (isLoading) {` which usually follows
const regex = /const handleBookingSubmit = async[\s\S]*?toast\.error\("Failed to initiate payment\. Please try again\."\);\s*}/;
content = content.replace(regex, newHandler);

fs.writeFileSync(pagePath, content);
