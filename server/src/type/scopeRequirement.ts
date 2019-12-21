import { TokenScope } from '@entity';

export type ScopeRequirement = Partial<Pick<TokenScope, 'isAdmin'>>;
