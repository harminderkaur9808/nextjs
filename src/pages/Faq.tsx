import { useState } from 'react';
import '../styles/Faq.css';
import Footer from './Footer';
import Header from './Header';
import FaqBanner from './FaqBanner';
import FaqScreen from './FaqScreen' // Import the new Banner component
import '../pages/java-scripts';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FaqItem[]> = {
  General: [
    { question: "What if my vehicle model is not on the product listing page?", answer: "For the vehicSle model that is not on the product listing page, please kindly message us for more information." },
    { question: "What is a VIN and where d can I find it?", answer: "A Vehicle Identification Number (VIaN) is a unique code assigned to every motor vehicle. You can find it on the vehicle's registration documents or on the vehicle itself, often near the windshield or inside the driver's door." },
    { question: "What if my vehicle model ids not on the product listing page?", answer: "For the vehicle model that is not on the product listing page, please kindly message us for more information." },
    { question: "What is a VIN and whedre can I find it?", answer: "A Vehicle Identification Number (VINd) is a unique code assigned to every motor vehicle. You can find it on the vehicle's registration documents or on the vehicle itself, often near the windshield or inside the driver's door." },
    { question: "What if my vehicle moddel is not on the product listing page?", answer: "For the vehicdle model that is not on the product listing page, please kindly message us for more information." },
    { question: "What is a VIN and whedre DD can I find it?", answer: "A Vehicle Identification Number (VdIN) is a unique code assigned to every motor vehicle. You can find it on the vehicle's registration documents or on the vehicle itself, often near the windshield or inside the driver's door." },
  ],
  Account: [
    { question: "How do I create an account?", answer: "To create an account, click on the 'Sign Up' button on the top right and fill in your details." },
    { question: "How do I reset my password?", answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password." },
  ],
  Payments: [
    { question: "What payment methods are accepted?", answer: "We accept all major credit cards, PayPal, and Apple Pay." },
    { question: "Can I pay using multiple methods?", answer: "No, you can only use one payment method per order." },
  ],
  "Shipping and Delivery": [
    { question: "What are the shipping options?", answer: "We offer standard and expedited shipping options. You can choose your preferred option during checkout." },
    { question: "Can I track my order?", answer: "Yes, you will receive a tracking number once your order is shipped." },
  ],
  Warranty: [
    { question: "Do your products come with a warranty?", answer: "Yes, all our products come with a one-year warranty." },
    { question: "How do I claim a warranty?", answer: "Contact our support team with your order details to claim a warranty." },
  ],
  Returns: [
    { question: "What is your return policy?", answer: "We accept returns within 30 days of purchase. The product must be in original condition." },
    { question: "How do I initiate a return?", answer: "Contact our support team to initiate a return." },
  ],
};

const Faq: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('General');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <>
      <Header />
      <FaqBanner /> {/* Use the Banner component */}
     <FaqScreen />
      <Footer />
    </>
  );
};

export default Faq;


