import { NewRoleType } from '@/lib/types';
import { ReactElement } from 'react';

export interface IRoleSection {
  idx: number;
  renderRow: (
    label: string,
    propertyName: string,
    data?: string
  ) => ReactElement;
  role: NewRoleType;
}
