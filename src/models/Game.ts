import { Model } from 'objection';
import Artist from './Artist';

class Game extends Model {

    id!: string;
    name!: string;
    total!: number;
    artist_id?: number;

    artist?: Artist;

    static tableName = 'games'


  static get relationMappings () {
    return {
      artist: {
        relation: Model.HasOneRelation,
        modelClass: Artist,
        join: {
          from: 'games.artist_id',
          to: 'artists.id',
        },
      },
    };
  }
}

export default Game;