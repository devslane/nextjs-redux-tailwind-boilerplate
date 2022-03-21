export type EntityIdentifier = number | string;

export interface Entity<T = EntityIdentifier> {
  id: T;
}

export interface EntityMap<T extends Entity> {
  [key: EntityIdentifier]: T;
}
