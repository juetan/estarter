import 'reflect-metadata';
import { plainToInstance, instanceToPlain, Transform, Expose, Exclude, TransformFnParams } from 'class-transformer';

const toVolumeString = ({ value }: TransformFnParams) => `${value},${value}`;
const toVolumeNumber = ({ value }: TransformFnParams) => Number(value.split(',')[0]);

const toDataId = ({ value }: TransformFnParams) => value[0].id;
const toData = ({ value }: TransformFnParams) => [{ id: value + 1001 }];

class StartEndTime {
  @Expose()
  startTime: Date;

  @Expose()
  endTime: Date;

  get playTime() {
    return [this.startTime, this.endTime];
  }

  set playTime(arg: [Date, Date] | undefined) {
    if (!Array.isArray(arg)) {
      this.startTime = undefined;
      this.endTime = undefined;
      return;
    }
    const [startTime, endTime] = arg;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

class User extends StartEndTime {
  @Exclude()
  @Expose({ name: 'id' })
  guid: number;

  @Expose()
  @Transform(toVolumeNumber, { toClassOnly: true })
  @Transform(toVolumeString, { toPlainOnly: true })
  volume: number;

  @Exclude()
  @Expose({ name: 'data' })
  @Transform(toDataId, { toClassOnly: true })
  @Transform(toData, { toPlainOnly: true })
  dataId: number;
}

interface SUser {
  id: number;
  volume: string;
  data: { id: number }[];
  [key: string]: any;
}

const p: SUser = { id: 1, volume: '90,90', data: [{ id: 10 }], startTime: '00:00:01', endTime: '00:00:02' };

const user = plainToInstance(User, p, { excludeExtraneousValues: true });
const user1 = instanceToPlain(user);

console.log('\n Plain Object: ', p, '\n Instance Object: ', user, '\n Plain Object: ', user1);

// npx tsx watch index.ts
