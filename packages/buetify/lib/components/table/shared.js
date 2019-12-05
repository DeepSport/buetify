import { contramap, eqStrict, eqString } from 'fp-ts/lib/Eq';
import { toggleListItem } from '../../utils/helpers';
export const eqBTableRowData = contramap(row => row.id)(eqStrict);
export const eqBTableColumn = contramap(column => column.label)(eqString);
export const toggleBTableRow = toggleListItem(eqBTableRowData);
export const toggleBTableColumn = toggleListItem(eqBTableColumn);
//# sourceMappingURL=shared.js.map