import { BaseFilter } from "../common/base-filter.class";

export class AccountGroupDto extends BaseFilter {
    id: string = '';
    orgId: string = '';
    name: string = '';
    notes: string = '';
}