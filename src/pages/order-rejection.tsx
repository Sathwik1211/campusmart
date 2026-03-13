import { usePageData } from '@/hooks/usePageData';

const OrderRejection = () => {
  const { data } = usePageData('order-rejection');
  const heroTitle = data.heroTitle ?? 'Order Rejection Policy';

  return (
    <main className="min-h-screen bg-cm-gray py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-cm-blue-dark mb-6">{heroTitle}</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-cm-blue-dark mb-3">1. Right to Reject</h2>
              <p>Campus Mart reserves the right to reject or cancel any order for reasons including but not limited to: product unavailability, errors in pricing or product description, or suspected fraudulent activity.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cm-blue-dark mb-3">2. Incomplete Information</h2>
              <p>Orders may be rejected if the provided contact details or shipping addresses are incomplete or unverifiable. We will attempt to contact you before taking this action.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cm-blue-dark mb-3">3. Delivery Constraints</h2>
              <p>We may have to reject orders for locations that fall outside our delivery network or where logistics are deemed unfeasible by our shipping partners.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cm-blue-dark mb-3">4. Refund on Rejection</h2>
              <p>If an order is rejected after payment has been processed, a full refund will be initiated to the original payment method within 7-10 working days.</p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last updated: March 2024</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderRejection;
