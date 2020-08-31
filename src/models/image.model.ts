import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Manga} from './manga.model';

@model()
export class Image extends Entity {
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
  order: number;


  @property({
    type: 'string',
    required: true,
  })
  path: string;

  @belongsTo(() => Manga)
  mangaId?: string;

  constructor(data?: Partial<Image>) {
    super(data);
  }
}

export interface ImageRelations {
  // describe navigational properties here
}

export type ImageWithRelations = Image & ImageRelations;
