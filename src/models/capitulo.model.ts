import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Manga} from './manga.model';

@model()
export class Capitulo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  rutamanga: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  numero?: number;

  @belongsTo(() => Manga)
  mangaId: string;

  constructor(data?: Partial<Capitulo>) {
    super(data);
  }
}

export interface CapituloRelations {
  // describe navigational properties here
}

export type CapituloWithRelations = Capitulo & CapituloRelations;
