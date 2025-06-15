'use client';

import { CheckoutSuccess } from '../CheckoutSuccess';

interface CheckoutSuccessPageProps {
  className?: string;
}

export const CheckoutSuccessPage = ({ className }: CheckoutSuccessPageProps) => {
  return (
    <CheckoutSuccess 
      className={className}
      onContinueShopping={() => window.location.href = '/'}
      onViewOrders={() => window.location.href = '/orders'}
    />
  );
};

export default CheckoutSuccessPage; 