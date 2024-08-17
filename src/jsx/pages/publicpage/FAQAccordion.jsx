import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
  } from '@mui/material';
  import { useState } from 'react';
  
  const FAQAccordion = () => {
    const [expanded, setExpanded] = useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const faqs = [
      {
        question: 'What is cryptocurrency?',
        answer: 'Cryptocurrency is a digital or virtual currency that uses cryptography for security. It operates independently of a central bank.',
      },
      {
        question: 'How do I buy cryptocurrency?',
        answer: 'You can buy cryptocurrency on various exchanges such as Coinbase, Binance, or Kraken. You need to create an account, deposit funds, and then you can buy cryptocurrency.',
      },
      {
        question: 'What is blockchain?',
        answer: 'Blockchain is a distributed ledger technology that underlies cryptocurrencies. It records transactions across many computers so that the record cannot be changed retroactively.',
      },
      {
        question: 'Is cryptocurrency legal?',
        answer: 'The legality of cryptocurrency varies by country. In some countries, it is fully legal, while in others, it may be restricted or banned.',
      },
      {
        question: 'How do I store my cryptocurrency?',
        answer: 'Cryptocurrencies are stored in digital wallets. You can choose between hot wallets (online) and cold wallets (offline) depending on your security needs.',
      },
      {
        question: 'What are the risks of investing in cryptocurrency?',
        answer: 'Cryptocurrency investments are highly volatile and can result in significant losses. Investors should do thorough research and consider their risk tolerance.',
      },
      {
        question: 'Can I use cryptocurrency for purchases?',
        answer: 'Yes, many merchants accept cryptocurrency as a form of payment. However, acceptance varies widely depending on the region and merchant.',
      },
      {
        question: 'What is a cryptocurrency wallet?',
        answer: 'A cryptocurrency wallet is a digital tool that allows you to store, send, and receive digital currencies. It stores your private keys, which are used to sign transactions.',
      },
      {
        question: 'What is mining in cryptocurrency?',
        answer: 'Mining is the process by which new cryptocurrency coins are created and transactions are added to a blockchain. It requires significant computational power.',
      },
      {
        question: 'Can cryptocurrency be hacked?',
        answer: 'While the blockchain technology behind most cryptocurrencies is highly secure, individual accounts and exchanges can be vulnerable to hacking if not properly secured.',
      }
    ];
  
    return (
      <Box sx={{ backgroundColor: '#000', color: 'white', padding: '20px' }} className='FAQSection'>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{ backgroundColor: '#000', color: 'white', marginBottom: '10px' }}
          >
            <AccordionSummary
              expandIcon={
                expanded === `panel${index}` ? (
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>-</Typography>
                ) : (
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>+</Typography>
                )
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };
  
  export default FAQAccordion;
  