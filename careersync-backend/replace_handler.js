const fs = require('fs');
const path = 'careersync-frontend/src/app/book/[serviceId]/page.tsx';
let str = fs.readFileSync(path, 'utf8');

const oldHandler = `
    try {
      // Step 1: Create the Razorpay order
      const orderResponse = await createPaymentOrder(serviceId);
      const order = orderResponse.data;
      toast.dismiss(toastId);

      // Step 2: Open Razorpay checkout
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CareerSync",
        description: \`Payment for \${service.name}\`,
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          // Step 3: Verify payment and create booking
          const verificationToast = toast.loading("Verifying payment...");
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingDetails: {
                ...bookingDetails,
                serviceId: serviceId,
                providerId: selectedProvider._id
              }
            });
            toast.success("Application submitted successfully!", { id: verificationToast });
            router.push('/my-bookings');
          } catch (error) {
            console.error("Payment verification failed:", error);
            const errorMessage = error instanceof Error && 'response' in error && 
              error.response && typeof error.response === 'object' && 
              'data' in error.response && error.response.data && 
              typeof error.response.data === 'object' && 'message' in error.response.data
              ? String(error.response.data.message)
              : "Payment verification failed";
            toast.error(errorMessage, { id: verificationToast });
          }
        },
        prefill: {
          name: user?.fullName,
          email: user?.email,
        },
        theme: {
          color: "#1e40af", // Match project's primary blue
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        toast.error(\`Payment failed: \${response.error.description}\`);
      });
      razorpay.open();
    } catch (error) {
      console.error("Error creating payment order:", error);
      toast.dismiss(toastId);
      toast.error("Failed to initiate payment. Please try again.");
    }`;

const newHandler = `
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
        error.response && typeof error.response === 'object' && 
        'data' in error.response && error.response.data && 
        typeof error.response.data === 'object' && 'message' in error.response.data
        ? String(error.response.data.message)
        : "Failed to submit application.";
      toast.error(errorMessage);
    }`;

str = str.replace(oldHandler.trim(), newHandler.trim());

// also remove Script tag
str = str.replace(/<Script[\s\S]*?checkout\.js"[\s\S]*?\/>\s*/g, '');

fs.writeFileSync(path, str);
