import { Model } from 'objection';
import Artist from './Artist';

class Image extends Model {

    id!: number;
    artist_id!: number;
    url!: string;
    artsy_id!: string;
    slug!: string;
    title!: string;

    artist?: Artist;

    static tableName = 'images';


  static get relationMappings () {
    return {
      artist: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: 'images.artist_id',
          to: 'artists.id',
        },
      },
    };
  }
}

export default Image;