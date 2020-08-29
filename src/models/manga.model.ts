import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Capitulo} from './capitulo.model';
import {Category} from './category.model';
import {Image} from './image.model';

@model()
export class Manga extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  code?: string;

  @hasMany(() => Capitulo)
  capitulo: Capitulo[];

  @belongsTo(() => Category)
  categoryId: string;

  @hasMany(() => Image)
  image: Image[];

  constructor(data?: Partial<Manga>) {
    super(data);
  }
}

export interface MangaRelations {
  // describe navigational properties here
}

export type MangaWithRelations = Manga & MangaRelations;
