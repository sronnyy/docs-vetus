// Agregador de dados da documentação
// @version 1.0.0

import { introductionSections } from './introduction.jsx';
import { conceptsSections } from './concepts.jsx';

import { walletsSection } from './endpoints/wallets';
import { balanceSection } from './endpoints/balance';
import { pixCreateSection } from './endpoints/pixCreate';
import { pixListSection } from './endpoints/pixList';
import { pixStatusSection } from './endpoints/pixStatus';
import { withdrawalsCreateSection } from './endpoints/withdrawalsCreate';
import { withdrawalsListSection } from './endpoints/withdrawalsList';
import { withdrawalsDetailSection } from './endpoints/withdrawalsDetail';

export const defaultSections = [
  ...introductionSections,
  ...conceptsSections,
  walletsSection,
  balanceSection,
  pixCreateSection,
  pixListSection,
  pixStatusSection,
  withdrawalsCreateSection,
  withdrawalsListSection,
  withdrawalsDetailSection,
];

export default defaultSections;